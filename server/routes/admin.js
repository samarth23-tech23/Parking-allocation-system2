
const express=require("express");
const router=express.Router();
const Signup=require("./mongodb");

router.get("/dashboard",(req,res)=>{
    res.render('dashboard');
});

router.get("/alluser",(req,res)=>{
    Signup.find()
          .then(signups => {
            res.render('alluser', { signups }); // Render the index.ejs template and pass the signups data
          })
          .catch(err => {
            console.error('Failed to fetch signups:', err);
            res.status(500).json({ error: 'Internal server error' });
          });
      });


router.get("/_card",(req,res)=>{
    res.render('_card');
});

router.get("/table_info",(req,res)=>{
    res.render('table_info');
});

module.exports=router;