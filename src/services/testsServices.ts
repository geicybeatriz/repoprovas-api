import { Test } from "@prisma/client";
import repoTests from "../repositories/testsRepository.js";
import repoUsers from "../repositories/userRepository.js";
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
    const user = await repoUsers.findById(userId);
    if(!user) throw {type:"not found", message:"user not found"};

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

const testService = {
    createTest
}

export default testService;

