import prisma from "../config/database.js";

async function findAll(){
    return await prisma.disciplines.findMany();
}

async function findByName(name:string){
    return await prisma.disciplines.findFirst({
        where: {
            name:name
        }
    });
}

async function findById(id:number){
    return await prisma.disciplines.findFirst({
        where: {id:id}
    });
}

const repoDiscipline = {
    findAll,
    findById,
    findByName
}

export default repoDiscipline;