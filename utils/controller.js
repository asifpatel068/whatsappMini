const { MessageModel } = require("../model/messgeModel");
const { UserModel } = require("../model/usermodel");

async function login(socket,credentials){
    try{
        const {email,password}=credentials
        const user=await UserModel.findOne({email});

        if(!user || user.password!==password){
            socket.emit("login_error","Invalid email or password");
            return
        }
        socket.emit("login_success",{userId:user._id})
        socket.data.userId=user._id
        console.log("User loggedIn")
    }catch(err){
        console.log(err)
        socket.emit("login_error","Error in login")
    }
}

async function sendMessage(socket,msg){
    try{
        const {senderId,recipientId,content}=msg
       
        const message=new MessageModel({senderId,recipientId,content,timestamp:new Date()});
        await message.save()

        socket.emit("message",message);
        socket.to(recipientId).emit("message",message)

        console.log(`Messge Sent ${content}`)
       
    }catch(err){
        console.log(err)
        socket.emit("message_error","Error in sending message")
    }
}

module.exports={
    login,sendMessage
}