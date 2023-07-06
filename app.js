const express=require("express");
const bodyParser=require("body-parser");
const _=require("lodash");
const admin=require("./routes/admin");
const users=require("./routes/users");
const path = require('path');


const ejs=require("ejs");


const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname+"/public"));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'views')));



app.use("/admin",admin);
app.use("/user",users);



app.get("/",(req,res)=>{
  res.render('homepage');
});


app.get("/demo",(req,res)=>{
  res.render('demo');
});


app.listen(port,()=>{
    console.log(`Server started on port ${port}...`);
});