import dataType from "sequelize"
function init(connection){
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
        education: {
            type: dataType.STRING,
            allowNull: false,
        },
        role:{
            type: dataType.ENUM("admin" , "user" , "author" , "worker"),
            allowNull: false,
            defaultValue: "user",
        },
        bio:{
            type: dataType.STRING,
            allowNull: false,
        },
        birthday:{
            type: dataType.STRING,
            allowNull: false,
        },
        city:{
            type: dataType.STRING,
            allowNull: false,
        },
        country:{
            type: dataType.STRING,
            allowNull: false,
        },
        gender:{
            type: dataType.STRING,
            allowNull: false,
        },
        workExperience:{
            type: dataType.STRING,
            allowNull: false,  
        },
        image:{
            type: dataType.STRING,
            allowNull: false,
            defaultValue:
            'https://res.cloudinary.com/lms07/image/upload/v1645954589/avatar/6214b94ad832b0549b436264_avatar1645954588291.png',            
        },
        questions: {
           type : dataType.INTEGER,
           allowNull: false,
           defaultValue: 0,
        },
        answers: {
            type : dataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
         },
    })
}
export default init