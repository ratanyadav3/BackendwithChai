import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    watchHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'video'
    }],
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true, 
        trim:true
    },
    email:{
        type:String,
        required:true, 
        lowercase:true
    },
    fullName:{
        type:String,
        required:true
    },
    avatar:{
        type:String,  //cloudinary url
        required:true
    },
    coverImage:{
        type:String,
    },
    password:{
        type:String,
        required : [true,'Password is required']
    },
    refreshToken:{
        type:String,
        required:true
    },   

},{timestamps:true})



//This is an middleware. ye tab run hoga jab koi user model me kuch save karega..
//generally hmm password ko encrypt krna chahte hai jab user usse save kare uske liye hmne pre middleware ka use kiya hai .pre mtlab data save hone se phle chale..
userSchema.pre("save",async function(next){
      if(!this.isModified("password")) return next();
      this.password=bcrypt.hash(this.password,10)
      next();
})


//creating a method 

userSchema.methods.isPasswordCorrect = async function(password){
     return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign( 
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
           expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function(){

    return jwt.sign( 
        {
            _id:this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
           expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema);