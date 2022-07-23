import prisma from "../config/database.js";

async function findByName(name:string){
    return await prisma.category.findFirst({
        where: {
            name: name
        }
    });
}

async function findAll(){
    return await prisma.category.findMany();
}

async function findById(id: number){
    return await prisma.category.findFirst({
        where: {
            id:id
        }
    });
}



const repoCategory = {
    findAll,
    findById,
    findByName
}

export default repoCategory;