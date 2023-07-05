
const express=require("express");
const router=express.Router();
const Signup=require("./mongodb");
const mongoose=require("mongoose");
const { ObjectId } = mongoose.Types;

router.get("/dashboard", (req, res) => {
  res.render('dashboard', { activePage: 'dashboard' });
});

router.get("/alluser",(req,res)=>{
    Signup.find()
          .then(signups => {
             res.render('alluser' , { signups , activePage: 'alluser' } ); // Render the index.ejs template and pass the signups data
          })
          .catch(err => {
            console.error('Failed to fetch signups:', err);
            res.status(500).json({ error: 'Internal server error' });
          });
      });


 router.get("/_card", (req, res) => {
        res.render('_card', { activePage: '_card' });
      });

router.get('/table_info', async (req, res) => {
  try {
    const users = await Signup.find({ status: 'approved' }).exec();
    res.render('table_info', { users, activePage: '_card' });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});



// Find user by ID
function findUserById(userId) {
  return Signup.findById(userId);
}

// Find vehicle by ID
function findVehicleById(user, vehicleId) {
  return user.vehicleDetails.find(v => v._id.toString() === vehicleId);
}



router.post('/assign-parking', async (req, res) => {
  const { userId, vehicleId, parkingSlot } = req.body;

  try {
    // Find the user document by userId
    const user = await Signup.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Find the vehicle details by vehicleId
    const vehicle = user.vehicleDetails.find(v => v._id.toString() === vehicleId);
    if (!vehicle) {
      return res.json({ success: false, message: 'Vehicle not found' });
    }

    // Update the parking slot for the vehicle
    vehicle.parkingSlot = parkingSlot;

    // Save the updated user document
    await user.save();

    return res.json({ success: true, message: 'Parking assigned successfully' });
   
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: 'Error assigning parking' });
  }
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
