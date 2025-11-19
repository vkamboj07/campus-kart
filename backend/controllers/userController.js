const User = require("../models/User");

exports.signupUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.json({
            msg: "Signup successful!",
            userId: user._id  // ⭐ IMPORTANT
        });
    } catch (err) {
        console.log("Signup Error:", err);
        res.status(500).json({ msg: "Signup failed on server" });
    }
};
