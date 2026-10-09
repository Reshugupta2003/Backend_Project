import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  
    fullName : {
       type : String,
       required : true,
        trim : true,
        index : true,
    },
    userName : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,  // it helps to fast searching
    },

    email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
    },

    avtar : {
        type :String,  //cloudinary url of uploaded avtar
        required : true, 
    },
    coverImage : {
        type : String,
    },
    watchHistory : [
    {
       type : Schema.Types.ObjectId, // we gives everything in object format
       ref : "Video"
    }
    ],
    password : {
      type : String, // no encryption here
      required : [true, "Password is required"]
    },
    refreshToken : {
        type : String,
    }
  },
  {
    timestamps : true
  }
);
  /*
    1. use function instead arrow function because arrow function doesn't have their own this binding.
    2. use async because encryption is time taking process.
  */
 userSchema.pre("save", async function(next){
    if(!this.password.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
 })

 userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
 };
 userSchema.methods.generateAccessToken = function(){
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
 };
 userSchema.methods.generateRefreshToken = function(){
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
 };
export const User = mongoose.model("User", userSchema);