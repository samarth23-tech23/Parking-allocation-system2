const express=require("express");
const bodyParser=require("body-parser");
const _=require("lodash");
const admin=require("./routes/admin");
const users=require("./routes/users");


const ejs=require("ejs");


const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
app.use("/admin",admin);
app.use("/user",users);


// app.get('/side_bar', (req, res) => {
//     res.render('side_bar'); // Render the "side_bar" view
// });

// app.get('/_card', (req, res) => {
//   res.render('_card'); // Render the "card" view

// });

// app.get('/table_info', (req, res) => {
//   res.render('table_info'); // Render the "table" view
// });


// app.get('/page1', (req, res) => {
//   res.render('page1'); // Render the "table" view
// });


app.get("/",(req,res)=>{
  res.render('homepage');
});





app.listen(port,()=>{
    console.log(`Server started on port ${port}...`);
});