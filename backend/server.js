require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB COMPASS
mongoose.connect("mongodb://localhost:27017/campuskart")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// ROUTES
app.use("/contact", contactRoutes);
app.use("/signup", userRoutes);

// START SERVER
app.listen(5000, () =>
    console.log("Server running at http://localhost:5000")
);
