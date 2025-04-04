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
app.use(bodyParser.json({ extended: false }));
app.use(cors());

// home url
app.get('',(req,res)=>{
    res.redirect('/client/index.html')
  })
  
  
// load routes





// rough work

async function fetchData(url){
  const data = await fetch(url,{method:"GET"});
  const res = await data.json();
  console.log(res,"response from fetchData function");

};

// fetchData("https://opentdb.com/api.php?amount=10")

// import model
import sequelize from "./config/database.js";
import User from "./models/userModel.js";

// establish association


// connect database

sequelize.sync({})
.then((res)=>{
  app.listen(PORT,"localhost",()=>{
      console.log(`Server is running on http://localhost:${PORT}`);
  });

})
.catch((err)=>{
  console.log(err,"Error in database connection");  
});






