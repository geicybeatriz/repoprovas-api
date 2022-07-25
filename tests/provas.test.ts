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

beforeEach(async () => {await prisma.$executeRaw`TRUNCATE TABLE users`});

describe("POST /tests", () => {
    it("return 201 for create tests successfully", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toEqual(200);

        const newPost = await agent.post("/tests").send(testData).set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(201);
    });

    it("return 422 for invalid category", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toEqual(200);

        const newPost = await agent.post("/tests").send({...testData, category: "invalid"}).set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(422);
    });

    it("return 422 for invalid teacher", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toEqual(200);

        const newPost = await agent.post("/tests").send({...testData, teacher: "invalid"}).set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(422);
    });

    it("return 422 for invalid discipline", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toEqual(200);

        const newPost = await agent.post("/tests").send({...testData, discipline: "invalid"}).set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(422);
    });
})