const { expect } = require("chai");
const request = require("supertest");
const { obterToken } = require("../helpers/autenticacao.js");
const postTransferencia = require("../fixtures/postTransferencia.json");
const postLogin = require("../fixtures/postLogin.json");

require("dotenv").config();

describe("Transferências", () => {  
  describe("POST - Transferência", () => {
    let token;

    beforeEach(async () => {
      token = await obterToken(postLogin.usuario, postLogin.senha);
    });

    it("Deve retornar sucesso 201 quando o valor da transferência for >= que R$10,00", async () => {
      const bodyTransferencia = { ...postTransferencia };

      const resposta = await request(process.env.API_URL)
        .post("/transferencias")
        .set("content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(bodyTransferencia);

      expect(resposta.status).to.equal(201);
    });

    it("Deve retornar falhar 422 quando o valor da transferência for < que R$10,00", async () => {
      const bodyTransferencia = { ...postTransferencia };
      bodyTransferencia.valor = 9

      const resposta = await request("http://localhost:3000")
        .post("/transferencias")
        .set("content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(bodyTransferencia)

      expect(resposta.status).to.equal(422);
    });
  });
});
