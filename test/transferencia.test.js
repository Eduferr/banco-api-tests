const { expect } = require("chai");
const request = require("supertest");
const { obterToken } = require("../helpers/autenticacao.js");

require("dotenv").config();

describe("Transferências", () => {
  describe("POST - Transferência", () => {
    let token;
    
    beforeEach( async() => {
      token = await obterToken("Julio.lima", "123456");
    });

    it("Deve retornar sucesso 201 quando o valor da transferência for >= que R$10,00", async () => {
      const resposta = await request(process.env.API_URL)
        .post("/transferencias")
        .set("content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          contaOrigem: 2,
          contaDestino: 3,
          valor: 11,
          token: "",
        });

      expect(resposta.status).to.equal(201);
    });

    it("Deve retornar falhar 422 quando o valor da transferência for < que R$10,00", async () => {
      const resposta = await request("http://localhost:3000")
        .post("/transferencias")
        .set("content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          contaOrigem: 2,
          contaDestino: 3,
          valor: 9,
          token: "",
        });

      expect(resposta.status).to.equal(422);
    });
  });
});
