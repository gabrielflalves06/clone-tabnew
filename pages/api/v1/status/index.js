import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  //Pega a data que o código foi rodado
  const updatedAt = new Date().toUTCString();

  //Pega a versão do banco de dados
  const databaseVersionInfo = await database.query('SHOW server_version;');
  const databaseVersionResult = databaseVersionInfo.rows[0].server_version
  console.log(databaseVersionResult)

  //Pega o maximo de conexão que pode fazer ao banco de dados
  const databaseMaxConnectionsInfo = await database.query('SHOW max_connections;')
  const databaseMaxConnectionsResult = databaseMaxConnectionsInfo.rows[0].max_connections;
  console.log(databaseMaxConnectionsResult)

  //pega a quantidade de conexão feita ao banco de dados
  const databaseName = process.env.POSTGRES_DB
  const databaseOpenedConnectionsInfo = await database.query({
    text: "SELECT count(*)::int from pg_stat_activity WHERE datname= $1 ;",
    values: [databaseName],
  })
  const databaseOpenedConnectionsResult = databaseOpenedConnectionsInfo.rows[0].count
  console.log(databaseOpenedConnectionsResult)

  //estrutura as informações do banco de dados
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionResult,
        max_connections: parseInt(databaseMaxConnectionsResult),
        opened_connections: databaseOpenedConnectionsResult
      }
    }
  })
}

export default status;