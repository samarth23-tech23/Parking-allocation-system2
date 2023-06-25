
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



//Experimental code
router.post('/updatestatus/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      // Find the record with the given ID and update its status field
      const updatedRecord = await Signup.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
  
      if (!updatedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      return res.json(updatedRecord);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  });





module.exports=router;