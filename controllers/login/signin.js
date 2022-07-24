import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Responses  from "../../util/response"
import connection from "../../util/connection"
import User from "../../models/user"
async function login(req , res , next){
    try{
        console.log(User)
        const {email , password} = req.body
        if ( !email ) { 
            return Responses.badRequest( res , "400" , " email cannt be empty ")   }
        if ( ! password ) { 
            return Responses.badRequest( res , "400" ,  " password cannt be empty " )   }
            console.log(req.body)
        const user = await User.findOne({ where: { email  } });

        if (user === null) { 
            return Responses.badRequest( res , "400" , " user not found " ) 
        } 
       const checkpassword = await bcrypt.compare(password, user.password);
       if (!checkPassword) {
        return Responses.badRequest(
            res,
            "InvalidCredentials",
            "Email or password is incorrect"
        );
    }     
    const accessToken = jwt.sign(
        { userId: user.userId, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 2 * 24 * 60 * 60 }
    );
    const refreshToken = jwt.sign(
        { userId: user.userId, role: user.role, refresh: true },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: 7 * 24 * 60 * 60 }
    ); 
            
        return Responses.success(
            res,
            "logged in Successfully",
            {
                access_token: accessToken,
                refresh_token: refreshToken,
                role:user.role    
            }
        );     
    }
    catch(err){
      return next(err);
    }
}
export default login;
