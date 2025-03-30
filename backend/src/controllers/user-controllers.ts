import {NextFunction,Request,Response} from "express";
import User from "../models/User";
import { hash,compare } from "bcrypt" // bcrypt is used to encrypt the user string and then compare with user password

// Route -1 
export const getAllUsers = async (req:Request,res:Response,next:NextFunction)=>{
    // get All users from Db
    try{
        // get all users
        const users = await User.find();  // It will give all users data
        return res.status(200).json({message : "OK" ,users});
        
    }
    catch(error){
        return res.status(200).json({message : "ERROR" ,cause : error.message});
    }
}


// bcrypt is used to encrpting the user string
export const userSignup = async (req:Request,res:Response,next:NextFunction)=>{

    try{
        // user signup
        const {name,email,password}=req.body;
        const exixtingUser = await User.findOne({email});
        if(exixtingUser) return res.status(401).send("User Already Registered")
        const hashPassword = await hash(password,10);
        const user =  new User({name,email,password : hashPassword});
    
        await user.save();
        return res.status(201).json({message : "OK" ,id:user._id.toString()});
        
    }
    catch(error){
        return res.status(200).json({message : "ERROR" ,cause : error.message});
    }
}

// User Login
export const userLogin = async (req:Request,res:Response,next:NextFunction)=>{

    try{
        // user login
        const {email,password}= req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password");
        }
        return res.status(200).json({message : "OK" ,id:user._id.toString()});
        
    }
    catch(error){
        return res.status(200).json({message : "ERROR" ,cause : error.message});
    }
}