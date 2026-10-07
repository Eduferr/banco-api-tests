const { expect } = require("chai");
const request = require("supertest");

require ('dotenv').config()

describe("", () => {
  describe("POST /login", () => {
    it("Deve retornar 200 com tokem em string quanto usar credenciais validas", async () => {
      const resposta = await request(process.env.API_URL)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({
          username: "julio.lima",
          senha: "123456",
        });

      expect(resposta.status).to.equal(200);
      expect(resposta.body.token).to.be.a("string");
    });
  });
});
