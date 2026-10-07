const { expect } = require("chai");
const request = require("supertest");
const { obterToken } = require("../helpers/autenticacao.js");
const postTransferencia = require("../fixtures/postTransferencia.json");
const postLogin = require("../fixtures/postLogin.json");

require("dotenv").config();

describe("Transferências", () => {
  let token;

  beforeEach(async () => {
    token = await obterToken(postLogin.usuario, postLogin.senha);
  });
  describe("POST - Transferência", () => {
    it("Deve retornar sucesso 201 quando o valor da transferência for >= que R$10,00", async () => {
      const bodyTransferencia = { ...postTransferencia };

      const resposta = await request(process.env.API_URL)
        .post("/transferencias")
        .set("content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(bodyTransferencia);

      expect(resposta.status).to.equal(201);
    });

    it("Deve retornar falha 422 quando o valor da transferência for < que R$10,00", async () => {
      const bodyTransferencia = { ...postTransferencia };
      bodyTransferencia.valor = 9;

      const resposta = await request(process.env.API_URL)
        .post("/transferencias")
        .set("content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(bodyTransferencia);

      expect(resposta.status).to.equal(422);
    });
  });

  describe("GET /transferencias/{id}", async () => {
    it("Deve retornar sucesso com 200 e dados iguais ao registro de transferência quando o ID for válido", async () => {
      const resposta = await request(process.env.API_URL)
        .get("/transferencias/10")
        .set("Authorization", `Bearer ${token}`);

      console.log(resposta.status);
      console.log(resposta.body);
      expect(resposta.status).to.equal(200);
      expect(resposta.body.id).to.equal(10);
      expect(resposta.body.id).to.be.a("number");
      expect(resposta.body.conta_origem_id).to.equal(2);


    });
  });

  describe('GET / Transferencias', () => {
    it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async() => {
        const resposta = await request(process.env.API_URL)
        .get("/transferencias?page=1&limit=10")
        .set("Authorization", `Bearer ${token}`);

        expect(resposta.status).to.equal(200)
        expect(resposta.body.limit).to.equal(10)
        expect(resposta.body.transferencias).to.have.lengthOf(10)
    });
  });
});
