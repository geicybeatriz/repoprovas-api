import app from "../src/app.js";
import prisma from "../src/config/database.js";
import supertest from "supertest";

const agent = supertest(app);

const EMAIL = "teste1@gmail.com";
const PASSWORD = "senhaTeste01";
const userData = { email:EMAIL, password:PASSWORD};

const testData ={
    name: "Apostila teste 1",
    pdfUrl: "https://http.cat/102",
    category:"Projeto",
    discipline: "Humildade",
    teacher: "Bruna Hamori"
}

describe("POST /tests", () => {
    it("return 201 for create tests", async () => {
        
    })

})