import {NextFunction,Request,Response} from "express";
import User from "../models/User";
import { hash } from "bcrypt" // bcrypt is used to encrypt the user string and then compare with user password

export const getAllUsers = async (req:Request,res:Response,next:NextFunction)=>{
    // get All users from Db
    try{
        // get all users
        const users = await User.find();
        return res.status(200).json({message : "OK" ,users});
        
    }
    catch(error){
        return res.status(200).json({message : "ERROR" ,cause : error.message});
    }
}



export const userSignup = async (req:Request,res:Response,next:NextFunction)=>{

    try{
        // user signup
        const {name,email,password}=req.body;
        const hashPassword = await hash(password,10);
        const user =  new User({name,email,password : hashPassword});
    
        await user.save();
        return res.status(200).json({message : "OK" ,id:user._id.toString()});
        
    }
    catch(error){
        return res.status(200).json({message : "ERROR" ,cause : error.message});
    }
}