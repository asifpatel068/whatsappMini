const express=require("express")
const http=require("http")
const socketIO=require("socket.io")
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoute");
const { login, sendMessage } = require("./utils/controller");
const cors=require("cors")
const app=express();
const server=http.createServer(app);
const io=socketIO(server);

app.use(cors())
app.use(express.json())
app.use("/",userRouter)

io.on("connection",(socket)=>{
    console.log("A client connected:",socket.id)

    socket.on("login",(credentials)=>{
        login(socket,credentials)
    })

    socket.on("message",(message)=>{
        sendMessage(socket,message)
    })

    socket.on("disconnect",()=>{
        console.log("A client disconnect",socket.id);
    })
})

const port=4545
server.listen(port,async()=>{
    try{
        await connection
        console.log("conneted to Mongo database")
    }catch(err){
        console.log(err)
        console.log("Not connected to Mongo database")
    }
    console.log(`Server is running at ${port}`)
})