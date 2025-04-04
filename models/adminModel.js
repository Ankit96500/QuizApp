import { Model,DataTypes } from "sequelize";
import sequelize from "../config/database.js";


class Admin extends Model{}
Admin.init({
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
    password:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },


},{
    freezeTableName:true,
    sequelize,
});

export default Admin;











