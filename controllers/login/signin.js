import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Responses  from "../../util/response"
import express  from "express"
async function login(req , res , next){
    try{
        const {email , password} = req.body
        if ( !email ) { 
            return Responses.badrequest( res , "400" , " email cannt be empty ")   }
        if ( ! password ) { 
            return Responses.badrequest( res , "400" ,  " password cannt be empty " )   }
        const { user } = req.db.models
        const check = await user.findOne({ where: { email  } });
        if (check === null) { 
            return Responses.badrequest( res , "400" , " user not found " ) 
        } 
        bcrypt.compare(req.body.password, user. password, function(err, results){
            if(err){
                throw new Error(err)
             }
             if (results) { 
                return Responses.success( res , " Login success" , data )   }  // ****  edit data *** 
             else {   
                 return Responses.unauthorized( res )   }
            }
            ) 
    }
    catch(err){
      return next(err);
    }
}
export default login;