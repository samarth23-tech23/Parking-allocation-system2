const express=require ("express")
const app=express()
const path =require ("path")
const ejs=require("ejs")
const bodyParser=require ("body-parser")
const collection=require("./mongodb")


app.use(bodyParser.urlencoded({extended:true}));

app.use('/css' , express.static(__dirname + 'public/css'))

app.set('views', './views');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname='public')));



app.get("/",(req,res)=> {
    res.render("login")
})

app.get("/signup",(req,res)=> {
    res.render("signup")
})

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (check.password === req.body.password) {
            res.render("home")
        } else {
            res.send("Incorrect Password")
        }
    } catch (error) {
        res.send("Wrong input credentials");
    }

    await collection.insertMany([data])
    
    res.render("home")
});





app.post("/signup",async (req,res)=> {

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
    await collection.insertMany([data]);
    res.render("home");
} catch (error) {
    console.log(error);
    res.send("Error occurred while signing up.");
}
})

app.listen(3000,()=>{
    console.log("Port connected");
})