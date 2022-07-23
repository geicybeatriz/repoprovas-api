import prisma from "../config/database.js";
import { CreateUserData } from "../services/authServices.js";

async function findUserByEmail(email:string){
    return await prisma.user.findFirst({
        where: {email:email}
    });
}

async function createUser(data: CreateUserData) {
    await prisma.user.create({
        data: {
            email:data.email, 
            password:data.password
        }
    });
    
}

const repoUsers = {
    findUserByEmail,
    createUser
}

export default repoUsers;