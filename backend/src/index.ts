import app from "./app.js";
import {connectToDatabase} from "./db/connection.js";


// connections and listners
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Server open at ${PORT} && Connected to Database👍`);
        });
        
    })
    .catch((err)=>{
        console.log(err);
        
    })

  