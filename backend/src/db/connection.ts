import { connect, disconnect } from "mongoose";
export default async function connectToDatabase(){
    try{
        await connect(process.env.MONGODB_URL);  // mere connect will help in connecting database
    }
    catch(error){
        console.log(error);
        
        throw new Error("Cannot Conect TO MongoDb");
    }
}

async function disconnectFromDatabase(){
    try{
        await disconnect();  // when we want to disconnect from database
    }
    catch(error){
        console.log(error);
        
        throw new Error("Cannot Conect TO MongoDb");
    }
}

export {connectToDatabase , disconnectFromDatabase}