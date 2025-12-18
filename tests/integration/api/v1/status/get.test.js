test("GET /api/v1/status tem que retornar 200", async () => {
  //Testa se consegue conectar na API
  const response = await fetch("http://localhost:3000/api/v1/status")
  expect(response.status).toBe(200)

  //pega o corpo da API e transforma em JSON
  const responseBody = await response.json();
  console.log(responseBody)

  //Testa se a data do Updated está igual ao que vem da API
  expect(responseBody.updated_at).toBeDefined()
  const parsedUpdatedAt = new Date(responseBody.updated_at).toUTCString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt)

  //Testa se a versão do banco de dados está na versão correta
  expect(responseBody.dependencies.database.version).toEqual("16.0");

  //testa se o maximo de conexão do banco de dados é 100
  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  //testa se a conexão com o banco de dados é 1 em ambiente de desenvolvimento
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});