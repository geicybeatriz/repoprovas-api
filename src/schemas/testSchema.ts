import Joi from "joi";

const testSchema = Joi.object({
    name: Joi.string().required(),
    pdfUrl: Joi.string().required(),
    category: Joi.string()
                .valid("Projeto", "Prática", "Recuperação")
                .required(),
    discipline: Joi.string()
                .valid("HTML e CSS", "JavaScript", "React", "Humildade", "Planejamento", "Autoconfiança" )
                .required(),
    teacher: Joi.string().valid("Diego Pinho", "Bruna Hamori").required()
});

export default testSchema;