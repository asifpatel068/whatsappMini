const express=require("express");
const { UserModel } = require("../model/usermodel");
const { login, sendMessage } = require("../utils/controller");

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,profile_picture,contact_list}=req.body;
    try{
        // const userExists=UserModel.findOne(email)
        // console.log(userExists)
        // if(userExists){
        //     return res.status(401).send({msg:"User already Exists"})
        // }

        const user=new UserModel({name,email,password,profile_picture,contact_list})
        await user.save()
        res.status(201).send({msg:"User Registerd Sucessfull"})

    }catch(err){
        res.status(500).send({err:err})

    }
})

userRouter.post("/login",login);

userRouter.post("/message",sendMessage);

module.exports={
    userRouter
}