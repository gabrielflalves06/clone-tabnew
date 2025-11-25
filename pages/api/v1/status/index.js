function status(request, response) {
  response.status(200).json({ "Valor": "Está tudo funcionando normalmente?" })
}

export default status;