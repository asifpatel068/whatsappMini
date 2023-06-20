const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    profile_picture:String,
    contact_list:[{
        contact_name:String,
        contact_number:String
    }]
}
)

const UserModel=mongoose.model('User',userSchema)

module.exports={
    UserModel
}