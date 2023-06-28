const express = require("express");
const router = express.Router();
const Signup = require("./mongodb");
const multer = require("multer");
const session = require("express-session");

// File upload middleware using Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Set the filename for uploaded files
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Configure express-session middleware
router.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware to check if user is logged in
const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

// Routes
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/login", async (req, res) => {
  const username = req.body.name.trim(); // Remove leading/trailing spaces
  if (username.toLowerCase() === "admin" && req.body.password === "admin") {
    // Store the user role in the session
    req.session.role = "admin";
    res.redirect("/admin/dashboard");
  } else {
    try {
      const user = await Signup.findOne({
        name: { $regex: new RegExp(`^${username}$`, "i") },
      });

      if (user && user.password === req.body.password) {
        // Store the user ID in the session
        req.session.userId = user._id;

        if (user.status === "approved") {
          res.render("profile", { user, canAddVehicle: true });
        } else {
          res.render("profile", { user, canAddVehicle: false });
        }
      } else {
        res.send("Incorrect Username or Password");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      res.send("An error occurred");
    }
  }
});

router.get("/logout", (req, res) => {
  // Clear the session data
  req.session.destroy((err) => {
    if (err) {
      console.error("Error occurred during logout:", err);
    }
    res.redirect("/");
  });
});

router.post(
  "/signup",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "govtPaper", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Check the current count of signups
      const count = await Signup.countDocuments().exec();

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
        profilePicture: req.files["profilePicture"][0].filename,
        govtPaper: req.files["govtPaper"][0].filename,
        fcfsOrder: count + 1, // Set the FCFS order based on the current count
        vehicleDetails: [], // Initialize an empty vehicleDetails array
        status: "pending", // Set the default status to "pending"
      });

      // Save the signup data to the database
      await newSignup.save();
      console.log("Signup data saved to MongoDB");
      res.send("Signup data saved to MongoDB");
    } catch (err) {
      console.error("Error saving signup data to MongoDB:", err);
      res.status(500).send("Error saving signup data to MongoDB");
    }
  }
);

router.get("/profile", requireLogin, async (req, res) => {
  try {
    const user = await Signup.findById(req.session.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.status === "approved") {
      res.render("profile", { user, canAddVehicle: true });
    } else {
      res.render("profile", { user, canAddVehicle: false });
    }
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).send("Error retrieving user profile");
  }
});

router.post("/addVehicle", requireLogin, async (req, res) => {
  const { vehicleType, vehicleNumber } = req.body;

  try {
    // Find the user by ID
    const user = await Signup.findById(req.session.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.status !== "approved") {
      return res.status(403).send("User is not approved");
    }

    // Create a new vehicle object
    const newVehicle = {
      vehicleType,
      vehicleNumber,
    };

    // Push the new vehicle to the user's vehicleDetails array
    user.vehicleDetails.push(newVehicle);

    // Save the updated user object
    await user.save();

    res.redirect("profile");
  } catch (error) {
    console.error("Error adding vehicle details:", error);
    res.status(500).send("Error adding vehicle details");
  }
});

module.exports = router;
