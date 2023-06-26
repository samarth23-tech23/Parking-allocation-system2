const express=require("express");
const router=express.Router();
const Signup=require("./mongodb");
const multer =require("multer");




//Experimental code starts here

// File upload middleware using Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Set the destination folder for uploaded files
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Set the filename for uploaded files
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  

  router.post('/signup', upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'govtPaper', maxCount: 1 }]), (req, res) => {
    // Create a new Signup instance with the form data
    const newSignup = new Signup({
      fname: req.body.fname,
      lname: req.body.lname,
      name: req.body.name,
      flatno: req.body.flatno,
      wingname: req.body.wingname,
      email: req.body.email,
      phno: req.body.phno,
      password: req.body.password,
      profilePicture: req.files['profilePicture'][0].filename,
      govtPaper: req.files['govtPaper'][0].filename,
    });
  
    // Save the signup data to the database
    newSignup.save()
      .then(() => {
        console.log('Signup data saved to MongoDB');
        res.send('Signup data saved to MongoDB');
      })
      .catch((err) => {
        console.error('Error saving signup data to MongoDB:', err);
        res.status(500).send('Error saving signup data to MongoDB');
      });
  });
  
  

router.get("/login",(req,res)=>{
    res.render('login')
});

router.get("/signup",(req,res)=>{
    res.render('signup');
});

router.post("/login", async (req, res) => {
  try {
    const username = req.body.name.trim(); // Remove leading/trailing spaces
    if (username.toLowerCase() === "admin" && req.body.password === "admin") {
      res.redirect("/admin/dashboard");
    } else {
      const check = await Signup.findOne({ name: { $regex: new RegExp(`^${username}$`, "i") } });
      if (check && check.password === req.body.password) {
        res.render("homepage"); // login into profile
      } else {
        res.send("Incorrect Username or Password");
      }
    }
  } catch (error) {
    res.send("An error occurred");
  }
});





// router.post("/signup",async (req,res)=> {

//     const data = {
//         fname:req.body.fname,
//         lname:req.body.lname,
//         name:req.body.name,
//         email:req.body.email,
//         flatno:req.body.flatno,
//         wingname:req.body.wingname,
//         phno:req.body.phno,
//         password:req.body.password,
//         profilePic:req.body.profilePicture,
//         govtPaper
//     }
    
//     try {
//         await Signup.insertMany([data]);
//         res.redirect('/');
//     } catch (error) {
//         console.log(error);
//         res.send("Error occurred while signing up.");
//     }
//     })


    



module.exports=router;