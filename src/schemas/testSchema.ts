import Joi from "joi";

const testSchema = Joi.object({
    name: Joi.string().required(),
    pdfUrl: Joi.string().required(),
    category: Joi.string().required(),
    discipline: Joi.string().required(),
    teacher: Joi.string().required()
});

export default testSchema;