import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config(); // load environment variables from .env file

const PORT = process.env.PORT || 3000; // port number
const app = express();

// server static files
app.use(express.static(path.join(process.cwd(),"public")));

// connect 3rd parties
app.use(bodyParser.json());

app.use(cors());

// home url
app.get('',(req,res)=>{
    res.redirect('/account/userLogin.html')
  })
  
  
// load routes
import userRoutes from "./routes/userRoutes.js";

app.use('/app',userRoutes);


// import model
import sequelize from "./config/database.js";
import User from "./models/userModel.js";
import Admin from"./models/adminModel.js";



// connect database
sequelize.sync({force:false})
.then((res)=>{
  app.listen(PORT,"localhost",()=>{
      console.log(`Server is running on http://localhost:${PORT}`);
  });

})
.catch((err)=>{
  console.log(err,"Error in database connection");  
});






