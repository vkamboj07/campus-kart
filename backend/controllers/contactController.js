const Contact = require("../models/Contact");

// ---------------------------------------
// SAVE CONTACT FORM
// ---------------------------------------
exports.saveContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();

        res.json({
            msg: "Contact form submitted successfully!",
            contactId: contact._id
        });

    } catch (err) {
        console.log("Contact Save Error:", err);
        res.status(500).json({ msg: "Failed to save contact" });
    }
};
