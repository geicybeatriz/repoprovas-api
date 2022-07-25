import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/config/database.js";

const agent = supertest(app);

//dados do usuário
const EMAIL = "teste1@gmail.com";
const PASSWORD = "senhaTeste01";
const userData = { email:EMAIL, password:PASSWORD};

//dados de provas
const testData ={
    name: "Apostila teste 1",
    pdfUrl: "https://http.cat/102",
    category:"Projeto",
    discipline: "Humildade",
    teacher: "Bruna Hamori"
}

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

describe("POST /tests", () => {
    it("return 201 for create tests successfully", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toBe(200);

        const newPost = await agent.post("/tests").send(testData).set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(201);
    });

    it("return 422 for invalid category", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toBe(200);

        const newPost = await agent.post("/tests").send({...testData, category: "invalid"}).set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(422);
    });

    it("return 422 for invalid teacher", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toBe(200);

        const newPost = await agent.post("/tests").send({...testData, teacher: "invalid"}).set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(422);
    });

    it("return 422 for invalid discipline", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toBe(200);

        const newPost = await agent.post("/tests").send({...testData, discipline: "invalid"}).set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(422);
    });

    it("return 404 for invalid teacherDiscipline", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toBe(200);

        const newPost = await agent.post("/tests").send({...testData, discipline: "Humildade", teacher:"Diego Pinho"}).set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(404);
    });
});

describe("GET /tests", () => {
    it("return 200 for find all tests", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toBe(200);

        const newPost = await agent.get("/tests").set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(200);
    });

    it("return 200 for find tests by disciplines", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toBe(200);

        const newPost = await agent.get("/tests?groupBy=discipline").set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(200);
    });

    it("return 200 for find tests by disciplines", async () => {
        const createUser = await agent.post("/signup").send({...userData, confirm_password:PASSWORD});
        expect(createUser.status).toEqual(201);

        const login = await agent.post("/signin").send(userData);
        const token = login.text;
        expect(login.status).toBe(200);

        const newPost = await agent.get("/tests?groupBy=teacher").set("Authorization", `Bearer ${token}`);
        expect(newPost.status).toEqual(200);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
})