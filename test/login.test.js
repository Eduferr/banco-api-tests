const { expect } = require("chai");
const request = require("supertest");
const postLogin = require("../fixtures/postLogin.json");

require("dotenv").config();

describe("", () => {
  describe("POST /login", () => {
    it("Deve retornar 200 com tokem em string quanto usar credenciais validas", async () => {
      const bodyLogin = { ...postLogin };
      const resposta = await request(process.env.API_URL)
        .post("/login")
        .set("Content-Type", "application/json")
        .send(bodyLogin);

      expect(resposta.status).to.equal(200);
      expect(resposta.body.token).to.be.a("string");
    });
  });
});
