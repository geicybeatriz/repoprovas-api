import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/config/database.js";

const agent = supertest(app);

//dados do usuário
const EMAIL = "teste1@gmail.com";
const PASSWORD = "senhaTeste01";
const userData = { email:EMAIL, password:PASSWORD};

beforeEach(async () => await prisma.$executeRaw`TRUNCATE TABLE users`)

describe("POST /signup", () => {
    it("return 201 for valid inputs", async () => {
        const result = await agent.post("/signup").send({...userData, confirm_password:PASSWORD})
        expect(result.status).toEqual(201);
    });

    it("return 422 for invalid email", async () => {
        const result = await agent.post("/signup").send({...userData, email:"bananinha", confirm_password:PASSWORD});
        expect(result.status).toEqual(422);
    })

    it("return 422 for invalid passwords", async () => {
        const result = await agent.post("/signup").send({...userData, password:"outraSenha", confirm_password:PASSWORD});
        expect(result.status).toEqual(422);
    })

    it("return 409 for conflict error", async () => {
        const create = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(create.status).toBe(201);
        const conflict = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(conflict.status).toEqual(409);
    });
})

describe("POST /signin", () => {
    it("return 200 for success login", async () => {
        const create = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(create.status).toBe(201);
        const login = await agent.post("/signin").send(userData);
        expect(login.text).not.toBeNull();
        expect(login.status).toBe(200);
    });

    it("return 422 for invalid email input", async () => {
        const create = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(create.status).toBe(201);
        const login = await agent.post("/signin").send({...userData, email: "invalidEmail"});
        expect(login.status).toBe(422);
    });

    it("return 401 for incorrect password", async () => {
        const create = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(create.status).toBe(201);
        const login = await agent.post("/signin").send({...userData, password:"incorrect password"});
        expect(login.status).toBe(401);
    });

    it("return 404 for user not found", async () => {
        const login = await agent.post("/signin").send(userData);
        expect(login.status).toBe(404);
    });
});

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
    await prisma.$disconnect();
})