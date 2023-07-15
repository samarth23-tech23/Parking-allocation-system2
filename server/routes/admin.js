const express = require("express");
const router = express.Router();
const Signup = require("./mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const nodemailer = require("nodemailer");

// Create a transporter object for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "www.samarthamodkar@gmail.com",
    pass: "wbkcxpcjqftuppkw",
  },
});

router.get("/viewDocs", (req, res) => {
  res.render("verified", { activePage: "view Docs" });
});

router.get("/vdetails", async (req, res) => {
  const users = await Signup.find({ uploadStatus: { $in: ["pending", "rejected"] } }).exec();

  res.render("vdetails", { activePage: "view Docs", users });
});

router.get("/dashboard", (req, res) => {
  res.render("_card", { activePage: "_card" });
});

router.get("/logout", (req, res) => {
  res.redirect("/");
});

router.get("/un-parking", async (req, res) => {
  try {
    // Retrieve user data from MongoDB
    const users = await Signup.find({ parkingSlot: { $exists: false } });

    res.render("unassigned", { activePage: "_card", users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/alluser", (req, res) => {
  Signup.find()
    .then((signups) => {
      res.render("alluser", { signups, activePage: "alluser" }); // Render the index.ejs template and pass the signups data
    })
    .catch((err) => {
      console.error("Failed to fetch signups:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.get("/table_info", async (req, res) => {
  try {
    const users = await Signup.find({ status: "approved" }).exec();
    res.render("table_info", { users, activePage: "_card" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Find user by ID
function findUserById(userId) {
  return Signup.findById(userId);
}

// Find vehicle by ID
function findVehicleById(user, vehicleId) {
  return user.vehicleDetails.find(
    (v) => v._id.toString() === vehicleId
  );
}

router.post("/assign-parking", async (req, res) => {
  const { userId, vehicleId, parkingSlot } = req.body;

  try {
    // Find the user document by userId
    const user = await Signup.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Find the vehicle details by vehicleId
    const vehicle = user.vehicleDetails.find(
      (v) => v._id.toString() === vehicleId
    );
    if (!vehicle) {
      return res.json({ success: false, message: "Vehicle not found" });
    }

    // Update the parking slot for the vehicle
    vehicle.parkingSlot = parkingSlot;

    // Save the updated user document
    await user.save();

    return res.json({ success: true, message: "Parking assigned successfully" });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "Error assigning parking" });
  }
});

router.post("/verifyUser", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await Signup.findByIdAndUpdate(
      userId,
      { uploadStatus: "verified" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const mailOptions = {
      from: "www.samarthamodkar@gmail.com",
      to: user.email,
      subject: "Verification Email",
      text:
        "Congratulations! Your account has been verified. Please Log in and Upload the Deposit Cheque photo and RC book",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.json({ success: true, message: "User verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/rejectUser", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await Signup.findByIdAndUpdate(
      userId,
      { uploadStatus: "rejected" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const mailOptions = {
      from: "www.samarthamodkar@gmail.com",
      to: user.email,
      subject: "Verification Email",
      text:
        "Sorry! Your account has been rejected. Please contact the admin for further details.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.json({ success: true, message: "User rejected successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
