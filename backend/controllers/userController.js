const User = require("../models/User");

exports.signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User with this email already exists" });
        }

        // Create new user and save to MongoDB
        const user = new User({
            name,
            email,
            password,
            address: "",
            phone: ""
        });
        
        await user.save();

        console.log("User saved to MongoDB:", user._id);

        res.json({
            msg: "Signup successful!",
            userId: user._id.toString()
        });
    } catch (err) {
        console.log("Signup Error:", err);
        res.status(500).json({ msg: "Signup failed on server: " + err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({
            name: user.name,
            email: user.email,
            password: user.password,
            address: user.address || "",
            phone: user.phone || ""
        });
    } catch (err) {
        console.log("Get User Error:", err);
        res.status(500).json({ msg: "Failed to fetch user data" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }
        
        // Find user in MongoDB
        const user = await User.findOne({ email });
        
        if (!user) {
            console.log("Login failed: User not found for email:", email);
            return res.status(401).json({ msg: "Invalid email or password" });
        }
        
        // Check password
        if (user.password !== password) {
            console.log("Login failed: Incorrect password for email:", email);
            return res.status(401).json({ msg: "Invalid email or password" });
        }
        
        console.log("Login successful for user:", user._id);
        
        res.json({
            msg: "Login successful!",
            userId: user._id.toString()
        });
    } catch (err) {
        console.log("Login Error:", err);
        res.status(500).json({ msg: "Login failed on server: " + err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Validate user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Update user in MongoDB
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        
        console.log("User updated in MongoDB:", userId);
        
        res.json({
            msg: "User updated successfully!",
            user: {
                name: updatedUser.name,
                email: updatedUser.email,
                address: updatedUser.address || "",
                phone: updatedUser.phone || ""
            }
        });
    } catch (err) {
        console.log("Update User Error:", err);
        res.status(500).json({ msg: "Failed to update user: " + err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Validate userId format
        if (!userId || userId.length < 10) {
            return res.status(400).json({ msg: "Invalid user ID" });
        }
        
        // Find and delete user from MongoDB
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            console.log("Delete failed: User not found with ID:", userId);
            return res.status(404).json({ msg: "User not found" });
        }
        
        console.log("User deleted from MongoDB:", userId);
        console.log("Deleted user email:", deletedUser.email);
        
        res.json({ 
            msg: "User deleted successfully!",
            deleted: true
        });
    } catch (err) {
        console.log("Delete User Error:", err);
        res.status(500).json({ msg: "Failed to delete user: " + err.message });
    }
};