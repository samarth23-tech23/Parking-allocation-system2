
const express=require("express");
const router=express.Router();

router.get("/api/users",(req,res)=>{
    res.send("<h1> Welcome to Parking allocation system</h1>");
});


module.exports=router;