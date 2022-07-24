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

async function getTestsByDiscipline(){
    const tests = await prisma.terms.findMany({
        include:{
            disciplines:{
                include:{
                    teachers:{
                        include:{
                            teachers:true,
                            tests:{
                                include:{
                                    categories:true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return tests;
}

async function getTestsByTeacher(){
    const tests = await prisma.teacherDisciplines.findMany({
        include:{
            teachers:true,
            disciplines:true,
            tests:{
                include:{
                    categories:true
                }
            }
        }
    });
    return tests;
}

async function findAllTests(){
    const tests = await prisma.test.findMany({
        include:{
            teachers: {
                include:{
                    teachers:true,
                    disciplines:{
                        include: {terms: {}}
                    }
                }
            },
            categories:true
        }
    });
    return tests;
}

const repoTests = {
    insertDataTest,
    findTeacherDiscipline,
    getTestsByDiscipline,
    getTestsByTeacher,
    findAllTests
}

export default repoTests;