const mongoose=require("mongoose")

const messageSchema=mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    recipientId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:String,
    timestamp:Date,
}
)

const MessageModel=mongoose.model('Message',messageSchema)

module.exports={
    MessageModel
}