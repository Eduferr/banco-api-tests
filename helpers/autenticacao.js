const request = require("supertest");
require("dotenv").config();

const obterToken = async (usuario, senha) => {
  const respostaLogin = await request(process.env.API_URL)
    .post("/login")
    .set("Content-Type", "application/json")
    .send({
      username: usuario,
      senha: senha,
    });
  return (token = respostaLogin.body.token);
};

module.exports = { obterToken };
