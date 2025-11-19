const Contact = require("../models/Contact");

exports.saveContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.json({ msg: "Contact form saved!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error saving form" });
    }
};
