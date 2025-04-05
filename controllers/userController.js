import User from "../models/userModel.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";    

dotenv.config(); // load environment variables from .env file

export const UserRegistrationForm = async function(req,res){

    // if user already exist and their attempts also invalid: dont't allow to register again:
    if(req.user && req.user.attempt >= 2){
        return res.status(200).json({message:"User already exist",entry:false});
    }

    // if new request then create a new user:
    const {name,email,location} = req.body;
    // console.log(name,email,location,"user data from client side");
    try {
        // check weather the given email is already exist or not:
        const existingUser = await User.findOne({where:{email:email}});    

        if (existingUser) { 
           return  res.status(200).json({status:false,message:"User already exist",entry:false,email:email});
        };
     

        const data = await User.create({
            name:name,
            email:email,
            location:location,
        })
        // create jwt token for user:
        JWT.sign({user_id:data.id,name:data.name},process.env.JWT_SECRET_KEY,(err,token)=>{
            if (err) {
                console.log(err,"Error in token generation");
                res.status(500).json({message:"Error in token generation"});
            }else{
                // console.log(token,"token generated successfully");
                res.status(201).json({status:true,message:"User registered successfully",token:token,entry:true});
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
    
    
    if (!req.user) {
        return res.status(401).json({message:"Unauthorized"});
    }
    // check if attemp exceeded 2 times:
    if (req.user.attempt > 2) {
        return res.status(200).json({
            status:false,
            message:"You have already attempted the quiz",
            finalScore:req.user.score,
            entry:false,
        });
    }
  
    try {
         
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple',{method:"GET"});
        if (response.ok) {
            const data = await response.json();
            // console.log("questions else block:", data);
            res.status(200).json({
                status:true,
                quizzQuestions:data,
                attempt:req.user.attempt,
                username:req.user.name,
            });
        }else {
            return res.status(500).json({ message: "Failed to fetch quiz data" });
        }
    } catch (error) {
        console.log("an error occur:",error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const updateUserInformation = async function(req,res){
    
    if (!req.user) {
        return res.status(401).json({status:false,message:"Unauthorized"});
    }
    const {score,attempt} = req.body;
    try {

        await User.increment(
            { attempt: attempt, score: score },
            { where: { id: req.user.id } }
          )
   
        res.status(200).json({status:true,message:"User information updated successfully"});
    } catch (error) {
        
        res.status(404).json({status:false,message:"User not found"});
    }

};













