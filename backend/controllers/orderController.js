const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    try {
        // Validate required fields
        const { orderId, firstName, lastName, email, items, total } = req.body;
        
        if (!orderId || !firstName || !lastName || !email || !items || !total) {
            return res.status(400).json({ msg: "Missing required order fields" });
        }

        // Create order and save to MongoDB
        const order = new Order(req.body);
        await order.save();
        
        console.log("Order saved to MongoDB:", order._id, "Order ID:", order.orderId);
        
        res.json({
            msg: "Order created successfully!",
            orderId: order.orderId,
            order: order
        });
    } catch (err) {
        console.log("Order Error:", err);
        res.status(500).json({ msg: "Order creation failed: " + err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.log("Get Orders Error:", err);
        res.status(500).json({ msg: "Failed to fetch orders" });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.json(order);
    } catch (err) {
        console.log("Get Order Error:", err);
        res.status(500).json({ msg: "Failed to fetch order" });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.json({ msg: "Order status updated", order });
    } catch (err) {
        console.log("Update Order Error:", err);
        res.status(500).json({ msg: "Failed to update order" });
    }
};

