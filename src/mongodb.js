const mongoose=require("mongoose");
const { reset } = require("nodemon");

const db ="mongodb+srv://pritiprasad2003:dbpriti123@cluster0.sscg5rg.mongodb.net/userlogin_db?retryWrites=true&w=majority"

mongoose.connect(db)


.then(()=>{
    console.log("MongoDB connected")
})

.catch(()=>{
    console.log("Failed to connect")
}
)

const signupSchema=mongoose.Schema({
    fname:{
        type:String,
        required:true
        
    },
    lname:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    flatno :{
        type:Number,
        required: true
    },
    wingname:{
        type:String,
        required: true
    },
    phno:{
        type:Number,
        required: true
    },
    password:{
        type:String,
        required:true
    }
  
})

const collection=new mongoose.model("collection1",signupSchema)

module.exports=collection