import Joi from "joi";

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().required(),
    confirm_password:Joi.ref('password')
});

const authSchemas = {
    signUpSchema
}

export default authSchemas;