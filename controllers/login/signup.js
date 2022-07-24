import Joi from 'joi'
import  joipassword, { joiPassword } from 'joi-password';
import response from "../../util/response.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from '../../models/user'
const validateBody = (body) =>{
    const objectSchema = Joi.object({
        firstName: Joi.string()
        .min(3)
        .max(32)
        .required()
        .trim()
        .pattern(/^[a-zA-Z\s]*$/)
        .message({
            "string.empty":"firstname cannot be empty",
            "string.min": "firstname length must be equal or higher than 3 characters",
            "string.max": "firstname length not exceed 32 characters"
        }),
        lastName: Joi.string()
        .min(3)
        .max(32)
        .required()
        .trim()
        .pattern(/^[a-zA-Z\s]*$/)
        .message({
            "string.empty":"lastname cannot be empty",
            "string.min": "lastname length must be equal or higher than 3 characters",
            "string.max": "lastname length not exceed 32 characters"
        }),
        email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
			"string.empty": `email cannot be empty`,
			"string.email": `email must be a valid email address`,
			"any.required": `email is a required field`,
		}),
        password1: joiPassword
        .string()
        .min(8)
        .max(32)
        .required()
        .noWhiteSpaces()
        .minOfUppercase(1)
        .minOfLowercase(1)
        .minOfNumeric(1)
        .messages({
            "string.empty": `password cannot be empty`,
            "string.min": `password length must be equal or higher than {#limit} characters`,
            "string.max": `password length must not exceed {#limit} characters`,
            "any.required": `password is a required field`,
            "string.minOfUppercase":
                "{#label} should contain at least {#min} uppercase character",
            "string.minOfLowercase":
                "{#label} should contain at least {#min} lowercase character",
            "string.minOfNumeric":
                "{#label} should contain at least {#min} numeric character",
            "string.noWhiteSpaces": "{#label} should not contain white spaces",
        }),
        password2: joiPassword
        .string()
        .min(8)
        .max(32)
        .required()
        .noWhiteSpaces()
        .minOfUppercase(1)
        .minOfLowercase(1)
        .minOfNumeric(1)
        .messages({
            "string.empty": `password cannot be empty`,
            "string.min": `password length must be equal or higher than {#limit} characters`,
            "string.max": `password length must not exceed {#limit} characters`,
            "any.required": `password is a required field`,
            "string.minOfUppercase":
                "{#label} should contain at least {#min} uppercase character",
            "string.minOfLowercase":
                "{#label} should contain at least {#min} lowercase character",
            "string.minOfNumeric":
                "{#label} should contain at least {#min} numeric character",
            "string.noWhiteSpaces": "{#label} should not contain white spaces",
        }),
        phone: Joi.string()
        .pattern(/^\+\d+$/)
        .trim()
        .required()
        .messages({
            "string.empty": `phone cannot be empty`,
            "string.pattern.base": `phone must be numeric and contains + sign at the beginning`,
            "any.required": `phone is a required field`,
        }),
        gender: Joi.string()
        .required()
        .messages({
            "any.required": `phone is a required field`,
        }),
    })
    return objectSchema.validate(body , {abortEarly : true})
}

async function register (req , res , next){
    try{
        console.log(req.body)
        const validateError = validateBody(req.body);
        if(validateError.error){
            console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")

            return response.badRequest(
                res,
                "ValidationError",
                validateError.error.details[0].message
            )
        }
        const {firstName , lastName , email , phone ,password1 ,password2 ,gender } = validateError.value;
        const check = await User.findOne({
            where:{
                email,
            },
        })
        if(check){
            return response.badRequest(
                res,
                "User already Exists",
                "User already Exists",
            )
        }
        const hashPassword = await bcrypt.hash(password1 , 10);

        const newuser = await User.create({
            firstName , 
            lastName , 
            email , 
            phone ,
            password:hashPassword ,
            gender, 
        })
        const accessToken = jwt.sign(
			{ userId: newuser.userId, role: newuser.role },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: 2 * 24 * 60 * 60 }
		);
		const refreshToken = jwt.sign(
			{ userId: newuser.userId, role: newuser.role, refresh: true },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: 7 * 24 * 60 * 60 }
		);
       delete newuser.dataValues.password;
       return response.success(
        res ,
        "registred Successfully",
        {
			access_token: accessToken,
			refresh_token: refreshToken,
        }
       );
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}
export default register;
