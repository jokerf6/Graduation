import joi from 'joi'
import joiPassword from 'joi-password'
import response from "../../util/response.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const validateBody = (body) =>{
    const objectSchema = joi.object({
        firstName: joi.string()
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
        lastName: joi.string()
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
        password: joiPassword
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
        education: joi.string()
        .trim()
        .required()
        .message({
            "string.empty": `education cannot be empty`,
            "any.required": `education is a required field`,
        }),
        bio: joi.string()
        .trim()
        .required()
        .message({
            "string.empty": `bio cannot be empty`,
            "any.required": `bio is a required field`,
        }),
        birthday: joi.string()
        .trim()
        .required()
        .message({
            "string.empty": `birthday cannot be empty`,
            "any.required": `birthday is a required field`,
        }),
        city: joi.string()
        .trim()
        .required()
        .message({
            "string.empty": `city cannot be empty`,
            "any.required": `city is a required field`,
        }),
        country: joi.string()
        .trim()
        .required()
        .message({
            "string.empty": `country cannot be empty`,
            "any.required": `country is a required field`,
        }),
        gender: joi.string()
        .trim()
        .required()
        .message({
            "string.empty": `gender cannot be empty`,
            "any.required": `gender is a required field`,
        }),
        workExperience: joi.string()
        .trim()
        .required()
        .message({
            "string.empty": `workExperience cannot be empty`,
            "any.required": `workExperience is a required field`,
        }),
    })
    return objectSchema.validate(body , {abortEarly : true})
}

async function register (req , res , next){
    try{
        const validateError = validateBody(req.body);
        if(validateError.error){
            return response.badRequest(
                res,
                "ValidationError",
                validateError.error.details[0].message
            )
        }
        const {email , password , firstName , lastName , phone , education , bio , birthday , city , country , gender , workExperience} = validateError.value;
        const user = req.db.models;
        const check = await user.findOne({
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
        const hashPassword = await bcrypt.hash(password , 10);
        const newuser = await user.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            phone,
            education,
            bio,
            birthday,
            city,
            country,
            gender,
            workExperience,
        })
        const accessToken = jwt.sign(
			{ userId: newUser.userId, role: newUser.role },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: 2 * 24 * 60 * 60 }
		);
		const refreshToken = jwt.sign(
			{ userId: newUser.userId, role: newUser.role, refresh: true },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: 7 * 24 * 60 * 60 }
		);
       delete newuser.dataValues.password;
       return response.success(
        res ,
        "registred Successfully",
        "registred Successfully",
       )
    }
    catch(err){
        console.log(err);
        return next(err);
    }
}
export default register;