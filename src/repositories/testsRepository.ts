import prisma from "../config/database.js";
import { CreateTestData } from "../services/testsServices.js";

async function insertDataTest(data: CreateTestData){
    await prisma.test.create({
        data: data
    });
}

async function findTeacherDiscipline(teacherId:number, disciplineId:number){
    return await prisma.teacherDisciplines.findFirst({
        where:{
            teacherId, disciplineId
        }
    })
}


const repoTests = {
    insertDataTest,
    findTeacherDiscipline
}

export default repoTests;