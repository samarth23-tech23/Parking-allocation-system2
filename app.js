const express=require("express");
const bodyParser=require("body-parser");
const _=require("lodash");
const ejs=require("ejs");


const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));



app.get("/",(req,res)=>{
    res.send("<h1> Welcome to Parking allocation system</h1>");
})


app.listen(port,()=>{
    console.log(`Server started on port ${port}...`);
});