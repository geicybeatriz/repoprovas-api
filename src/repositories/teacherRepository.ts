import prisma from "../config/database.js";

async function findAll(){
    return await prisma.teacher.findMany();
}

async function findById(id:number){
    return await prisma.teacher.findFirst({
        where: {id:id}
    });
}

async function findByName(name:string){
    return await prisma.teacher.findFirst({
        where:{name:name}
    });
}

const repoTeachers = {
    findAll,
    findById,
    findByName
};

export default repoTeachers;