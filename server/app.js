const express=require("express");
const bodyParser=require("body-parser");
const _=require("lodash");
const users=require("./routes/users");

const ejs=require("ejs");


const app=express();
const port=1234;

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
app.use("/api/user",users);



app.get("/api",(req,res)=>{
    res.send("<h1> Hello from express</h1>");
})



app.listen(port,()=>{
    console.log(`Server started on port ${port}...`);
});