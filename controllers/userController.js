import User from "../models/userModel.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";    

dotenv.config(); // load environment variables from .env file

export const UserRegistrationForm = async function(req,res){

    const {name,email,location} = req.body;
    // console.log(name,email,location,"user data from client side");
    try {
        const data = await User.create({
            name:name,
            email:email,
            location:location,
        })
        // create jwt token for user:
        JWT.sign({user_id:data.id,name:data.name},process.env.JWT_SECRET_KEY,(err,token)=>{
            if (err) {
                console.log(err,"Error in token generation");
                res.status(500).json({status:false,message:"Error in token generation"});
            }else{
                // console.log(token,"token generated successfully");
                res.status(201).json({status:true,message:"User registered successfully",token:token});
            }
        });

    } catch (error) {
        console.log("an error occur:");
        
        res.status(500).json({ error: "Something went wrong" });
    }
};


export const adminLogin = async function(req,res){
    
};


export const fetchQuizzQuestions = async function(req,res){
    
    try {
        
        const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple',{method:"GET"});
        if (response.ok) {
            const data = await response.json();
            console.log("questions else block:", data);
            res.status(200).json({
                status:true,
                quizzQuestions:data,
                attempt:req.user.attempt,
            });
        }
    } catch (error) {
        console.log("an error occur:",error);
        res.status(500).json({ error: "Something went wrong" });
    }


    // const url = "https://opentdb.com/api.php?amount=10";
    // const data = await fetch(url,{method:"GET"});
    // const result = await data.json();
    // console.log(result,"response from fetchQuizzQuestions function");
    // res.status(200).json({status:true,questions:result.results});
}

export const updateUserInformation = async function(req,res){
    const {name,email,score} = req.body;
    console.log(name,email,score,"user data from client side");
    const user = await User.findOne({where:{email}});
    if(user){
        await User.update({name,email,score},{where:{id:user.id}})
        res.status(200).json({status:true,message:"User information updated successfully"});
    }else{
        res.status(404).json({status:false,message:"User not found"});
    }
};













