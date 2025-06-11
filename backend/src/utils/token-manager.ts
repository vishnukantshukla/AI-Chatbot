import jwt from 'jsonwebtoken'
import {Request,Response,NextFunction} from "express"
import { COOKIE_NAME } from './constants';
export const createToken = (id:string,email:string,expiresIn:string) =>{
    const payload = {id,email};
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        // expiresIn:"7d", // Token will expire in 7 days
        expiresIn,  
    }); // sign will genearte the token
    return token;
}

export const verifyToken = async(req:Request,res:Response,next:NextFunction)=>{
    console.log("Vishn1+2")
    const token = req.signedCookies[`${COOKIE_NAME}`];
    console.log(token)
};