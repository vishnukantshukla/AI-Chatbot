import {NextFunction,Request,Response} from "express";
import User from "../models/User";
import { hash,compare } from "bcrypt" // bcrypt is used to encrypt the user string and then compare with user password
import { createToken } from "../utils/token-manager";
import { COOKIE_NAME } from "../utils/constants";

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

        // create token and store the cookie

        res.clearCookie(COOKIE_NAME,
            {
                httpOnly: true,
                domain:"localhost",
                signed:true,
                path:"/"
            }
        ); //  it will clear the cookie of the response of the user
        
        const token = createToken(user._id.toString(),user.email,"7d");

        const expires = new Date();
        expires.setDate(expires.getDate()+7);  // current date +7


        res.cookie(COOKIE_NAME,token,{
            path:"/",
            domain:"localhost",
            expires, 
            httpOnly:true,
            signed:true   // signed the payload 
        });
        return res.status(201).json({message : "OK" ,name:user.name,email:user.email});
        
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

        res.clearCookie(COOKIE_NAME,
            {
                httpOnly: true,
                domain:"localhost",
                signed:true,
                path:"/"
            }
        ); //  it will clear the cookie of the response of the user

        const token = createToken(user._id.toString(),user.email,"7d");

        const expires = new Date();
        expires.setDate(expires.getDate()+7);  // current date +7


        res.cookie(COOKIE_NAME,token,{
            path:"/",
            domain:"localhost",
            expires, 
            httpOnly:true,
            signed:true   // signed the payload 
        }); //COOKIE_NAME = auth name,token and inside the root directory we will store the cookie

        // now we will use cookie-parser to transfer the cookie from backend to the frontend
        return res.status(200).json({message : "OK" ,name:user.name,email:user.email});
        
    }
    catch(error){
        return res.status(200).json({message : "ERROR" ,cause : error.message});
    }
}



export const verifyUser = async (req:Request,res:Response,next:NextFunction)=>{

    try{
        const user= await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered Or Token malfunctioned");
        }
        console.log(user._id.toString(),res.locals.jwtData.id)
        if(user._id.toString()!== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");

        }
        return res.status(200).json({message : "OK" ,name:user.name,email:user.email});
        
    }
    catch(error){
        return res.status(200).json({message : "ERROR" ,cause : error.message});
    }
}