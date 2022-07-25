import { Category, Disciplines, Teacher, TeacherDisciplines, Terms, Test, User } from "@prisma/client";
import prisma from "./../src/config/database.js";

type CreateCategory = Omit<Category, "id">;
type CreateTerms = Omit<Terms, "id">;
type CreateTeachers = Omit<Teacher, "id">;
type CreateDiscipline = Omit<Disciplines, "id">;
type CreateTeacherDiscipline = Omit<TeacherDisciplines, "id">;

async function main(){
    const terms:CreateTerms[] = [{number:1}, {number:2}, {number:3}, {number:4}, {number:5}, {number:6}];

    const categories: CreateCategory[] = [
        {
            name: 'Projeto'
        },
        {
            name: "Prática"
        },
        {
            name: "Recuperação"
        }
    ];

    const teacher: CreateTeachers[] = [
        {
            name: "Diego Pinho"
        },
        {
            name: "Bruna Hamori"
        }
    ];

    const disciplines: CreateDiscipline[] = [
        {
            name: "HTML e CSS",
            termId: 1
        },
        {
            name: "JavaScript",
            termId: 2
        },
        {
            name: "React",
            termId: 3
        },
        {
            name: "Humildade",
            termId: 1
        },
        {
            name: "Planejamento",
            termId: 2
        },
        {
            name: "Autoconfiança",
            termId: 3
        }
    ];

    const teacherDiscipline: CreateTeacherDiscipline[] =[
        {
            teacherId: 1,
            disciplineId: 1
        },
        {
            teacherId: 1,
            disciplineId: 2
        },
        {
            teacherId: 1,
            disciplineId: 3
        },
        {
            teacherId: 2,
            disciplineId: 4
        },
        {
            teacherId: 2,
            disciplineId: 5
        },
        {
            teacherId: 2,
            disciplineId: 6
        }
    ]; 

    await prisma.terms.createMany({data:terms, skipDuplicates:true});
    await prisma.category.createMany({data:categories, skipDuplicates:true});
    await prisma.teacher.createMany({data:teacher, skipDuplicates:true});
    await prisma.disciplines.createMany({data:disciplines, skipDuplicates:true});
    await prisma.teacherDisciplines.createMany({data:teacherDiscipline, skipDuplicates:true});

}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})

