import React from 'react'
import {Avatar, Box, Typography,Button,IconButton}   from "@mui/material"
import {red} from "@mui/material/colors"
import { useAuth } from '../context/AuthContext'
import ChatItem from '../Components/chat/ChatItem';
import {IoMdSend}  from 'react-icons/io'
const chatMessages = [
  {
    role: "user",
    content: "What are some effective time management tips?"
  },
  {
    role: "assistant",
    content: "Here are a few tips: prioritize tasks, set clear goals, use a planner, avoid multitasking, and take regular breaks."
  },
  {
    role: "user",
    content: "Can you suggest a good business book for beginners?"
  },
  {
    role: "assistant",
    content: "Sure! 'The Lean Startup' by Eric Ries is a great book that introduces essential concepts for entrepreneurs."
  },
  {
    role: "user",
    content: "How can I improve my public speaking skills?"
  },
  {
    role: "assistant",
    content: "Practice regularly, record yourself, join a speaking club like Toastmasters, and seek constructive feedback."
  },
  {
    role: "user",
    content: "What’s the importance of financial literacy in education?"
  },
  {
    role: "assistant",
    content: "Financial literacy helps students make informed money decisions, avoid debt, and plan for their future effectively."
  },
  {
    role: "user",
    content: "What should I avoid when talking to an AI assistant?"
  },
  {
    role: "assistant",
    content: "Avoid sharing personal information such as passwords, credit card numbers, or sensitive identity details."
  }
];


function Chat() {
  const auth =  useAuth();
  return (
     <Box sx={{display:'flex',flex:1,width:'100%',height:"100%",mt:3,gap:3,}}>
        <Box sx={{display:{md:"flex",xs:"none", sm:"none"},flex:0.2,flexDirection:'column'}}>
            <Box sx={{display:"flex", width:"100%",height:"60vh", bgcolor:"rgb(17,29,39)", borderRadius:5, flexDirection:'column', mx:3}}>
                <Avatar sx={{mx:"auto", my:2,bgcolor:"white",color:"black",fontWeight:700,}}>{auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
                
                </Avatar>
                <Typography sx={{mx:'auto', fontFamily:"work sans"}}>
                  You are talking to the ChatBOT
                </Typography>
                <Typography sx={{mx:'auto', fontFamily:"work sans",my:4,p:3}}>
                  You can ask questions related to Knowledge, Business, Advices, Education, etc., but avoid sharing personal information.
                </Typography>
                <Button sx={{width:"200px",my:'auto',color:'white', fontWeight:"700",borderRadius:3,mx:"auto",bgcolor:red[300],":hover":{
                  bgcolor:red.A400
                }}}>CLEAR CONVERSATION</Button>
            </Box>
        </Box>
        <Box sx={{display:"flex", flex:{md:0.8,xs:1,sm:1},flexDirection:'column',px:3}}>
            <Typography sx={{textAlign:'center',fontSize:"40px",color:'white',mb:2,mx:"auto", fontWeight:"600",}}>
                Model - GPT 3.5 Turbo 
            </Typography>
            <Box sx={{width:"100%",height:"60vh", borderRadius:3,mx:'auto',display:'flex',flexDirection:"column",overflow:'scroll',overflowX:"hidden", overflowY:"auto",scrollBehavior:"smooth"}}>
                {chatMessages.map((chat,index)=><ChatItem content={chat.content} role = {chat.role}  key={index}/>)}
            </Box>
            <div style={{width:"100%",padding:"20px",borderRadius:8,backgroundColor:"rgb(17,27,39",display:"flex",margin:"auto"}}>
              {" "}
              <input type='text' style={{width:"100%",backgroundColor:"transparent",padding:'10px',border:"none",outline:"none",color:"white", fontSize:"20px"}}/>
              <IconButton sx={{ml:"auto", color:"white"}}><IoMdSend/></IconButton>
            </div>
            
        </Box>
     </Box>
  )
}

export default Chat