import repoCategory from "../repositories/categoryRepository.js";
import repoDiscipline from "../repositories/disciplineRepository.js";
import repoTeachers from "../repositories/teacherRepository.js";
import repoTests from "../repositories/testsRepository.js";

async function verifyTeacher(name: string){
    const teacher = await repoTeachers.findByName(name);
    if(!teacher) throw {type:"not found", message:"this teacher not found"};
    return teacher;
}

async function verifyDiscipline(name:string){
    const discipline = await repoDiscipline.findByName(name);
    if(!discipline) throw {type:"not found", message:"this discipline not found"};
    return discipline;
}

async function verifyCategory(name:string){
    const category = await repoCategory.findByName(name);
    if(!category) throw {type:"not found", message:"this category not found"};
    return category;
}

async function verifyTeacherDiscipline(teacherId:number, disciplineId:number){
    const relation = await repoTests.findTeacherDiscipline(teacherId, disciplineId);
    if(!relation) throw {type:"not found", message:"this class not found"};
    return relation;
}

const testUtils = {
    verifyCategory,
    verifyDiscipline,
    verifyTeacher,
    verifyTeacherDiscipline
}

export default testUtils;