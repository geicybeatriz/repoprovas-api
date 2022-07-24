import { Test } from "@prisma/client";
import repoTests from "../repositories/testsRepository.js";
import authUtils from "../utils/authUtils.js";
import testUtils from "../utils/testUtils.js";

export type CreateTestData = Omit<Test, "id">;

interface newTest{
    name:string,
    pdfUrl: string,
    category: string,
    discipline:string,
    teacher:string
}

async function createTest(data:newTest, userId:number){
    await authUtils.verifyUser(userId);

    const teacher = await testUtils.verifyTeacher(data.teacher);
    const category = await testUtils.verifyCategory(data.category);
    const discipline = await testUtils.verifyDiscipline(data.discipline);
    const teacherDisciplines = await testUtils.verifyTeacherDiscipline(teacher.id, discipline.id);

    const test = {
        name:data.name,
        pdfUrl:data.pdfUrl,
        categoryId: category.id,
        teacherDisciplineId: teacherDisciplines.id
    }

    await repoTests.insertDataTest(test);
    return;
}


async function getAllTests(userId:number, groupBy:string){
    await authUtils.verifyUser(userId);

    if(groupBy === "discipline"){
        const testsDiscipline = await repoTests.getTestsByDiscipline();
        return testsDiscipline;
    }

    if(groupBy === "teacher"){
        const testsTeacher = await repoTests.getTestsByTeacher();
        return testsTeacher
    }

    const tests = await repoTests.findAllTests();
    return tests;
}

const testService = {
    createTest,
    getAllTests,
}

export default testService;

