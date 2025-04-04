import { Model,DataTypes } from "sequelize";
import sequelize from "../config/database.js";


class User extends Model{}
User.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    location:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    attempt:{
        type:DataTypes.INTEGER,
        defaultValue:1
    },
    score:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }

},{
    freezeTableName:true,
    sequelize,
});

export default User;











