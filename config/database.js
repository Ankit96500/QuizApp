import Sequelize from "sequelize";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
// create a sequelize instance

const sequelize = new Sequelize(
    process.env.DB_NAME,    // database name
    process.env.DB_USER,  // database username
    process.env.DB_PASSWORD, // database password
    {
        host:process.env.DB_HOST, // database host
        dialect:"mysql", // database dialect,
        logging:false, // disable logging
    }
); 


export default sequelize; // export sequelize instance























