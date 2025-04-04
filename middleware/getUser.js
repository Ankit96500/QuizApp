import User from "../models/userModel.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 

export const getUser = async (req, res, next) => {
        console.log(' iam amiddlweware....');
        
    try {
        const token = req.header('Authorization');
        console.log('token:', token);
        
        // verify the token:
        const userId = JWT.verify(token, process.env.JWT_SECRET_KEY);
        console.log('userId:', userId);

        const user = await User.findByPk(userId.user_id);
        
        req.user = user;
        console.log('user:', req.user);

        next();
    } catch (error) {
        return res.status(401).json({success:false,error:error})
    }

};











