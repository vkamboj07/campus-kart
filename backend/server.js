require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Verify environment variables
if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️  WARNING: RESEND_API_KEY not found in .env file");
    console.warn("   Email functionality will not work without API key");
    console.warn("   Please create .env file with RESEND_API_KEY");
}

const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());                // allow cross-origin requests
app.use(express.json());        // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// Configure EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('../frontend')); // Serve static files from frontend directory

// CONNECT TO MONGODB COMPASS
mongoose.connect("mongodb://localhost:27017/campuskart", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("✅ MongoDB Connected Successfully!");
        console.log("Database: campuskart");
        console.log("Collections: users, orders, contacts");
    })
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        console.log("Please make sure MongoDB is running on localhost:27017");
    });

// ROUTES
// View routes (EJS templates)
app.get('/', (req, res) => {
    res.render('index', { activePage: 'home' });
});

app.get('/about', (req, res) => {
    res.render('about', { activePage: 'about' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { activePage: 'contact' });
});

// API routes
app.use('/user', userRoutes);
app.use("/contact", contactRoutes);
app.use("/signup", userRoutes);
app.use("/orders", orderRoutes);

// START SERVER
app.listen(5000, () =>
    console.log("Server running at http://localhost:5000")
);
