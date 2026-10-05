const { expect } = require("chai");
const request = require("supertest");

describe("", () => {
  describe("POST /login", () => {
    it("Deve retornar 200 com tokem em string quanto usar credenciais validas", async function () {
      const resposta = await request("http://localhost:3000")
        .post("/login")
        .set("Content-Type", "application/json")
        .send({
          username: "julio.lima",
          senha: "123456",
        });

      expect(resposta.status).to.equal(200);
      expect(resposta.body.token).to.be.a('string');

    });
  });
});
