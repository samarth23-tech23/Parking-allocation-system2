const express=require("express");
const router=express.Router();
const Signup=require("./mongodb");

router.get("/login",(req,res)=>{
    res.render('login')
});

router.get("/signup",(req,res)=>{
    res.render('signup');
});

router.post("/login", async (req, res) => {
    try {
        const check = await Signup.findOne({ name: req.body.name });
        if (check.password === req.body.password ) {
            res.render("homepage"); //login into profile
        } else {
            res.send("Incorrect Password")
        }
    } catch (error) {
        res.send("Wrong input credentials");
    }

});



router.post("/signup",async (req,res)=> {

    const data = {
        fname:req.body.fname,
        lname:req.body.lname,
        name:req.body.name,
        email:req.body.email,
        flatno:req.body.flatno,
        wingname:req.body.wingname,
        phno:req.body.phno,
        password:req.body.password
    }
    
    try {
        await Signup.insertMany([data]);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.send("Error occurred while signing up.");
    }
    })


    



module.exports=router;