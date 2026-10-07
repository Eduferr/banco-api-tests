const request = require("supertest");
require("dotenv").config();
const postLogin = require("../fixtures/postLogin.json");

const obterToken = async (usuario, senha) => {
  const bodyLogin = { ...postLogin };
  const respostaLogin = await request(process.env.API_URL)
    .post("/login")
    .set("Content-Type", "application/json")
    .send(bodyLogin);
  return (token = respostaLogin.body.token);
};

module.exports = { obterToken };
