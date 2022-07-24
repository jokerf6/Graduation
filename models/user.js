import dataType  from "sequelize"
import connection from "../util/connection"
const User = 
    connection.define('user' ,{
        userId:{
            type: dataType.INTEGER,
            primaryKey: true,
         autoIncrement: true,
        },
        firstName:{
           type: dataType.STRING,
           allowNull: false,
        },
        lastName:{
            type: dataType.STRING,
            allowNull: false,    
        },
        email:{
            type: dataType.STRING,
            allowNull: false,
        },
        password:{
            type: dataType.STRING,
            allowNull: false,
        },
        phone:{
            type: dataType.STRING,
            allowNull: false,
        },
        role:{
            type: dataType.ENUM("admin" , "user" , "author" , "worker"),
            allowNull: false,
            defaultValue: "user",
        },
        gender:{
            type: dataType.STRING,
            allowNull: false,
        },
        image:{
            type: dataType.STRING,
            allowNull: false,
            defaultValue:
            'https://res.cloudinary.com/lms07/image/upload/v1645954589/avatar/6214b94ad832b0549b436264_avatar1645954588291.png',            
        },
    
             } 
                 )

export default User
