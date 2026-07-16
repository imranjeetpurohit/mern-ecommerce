const Order = require("../models/Order");


// Create Order

const createOrder = async (req, res) => {

    try {

        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        } = req.body;


        const order = await Order.create({

            user: req.user._id,

            orderItems,

            shippingAddress,

            paymentMethod,

            totalPrice

        });


        res.status(201).json(order);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Get Logged In User Orders

const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user._id
        });


        res.json(orders);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Admin Get All Orders

const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find({})
            .populate("user", "name email")
            .sort({
                createdAt: -1
            });


        res.json(orders);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Admin Update Order Status

const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(
            req.params.id
        );


        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }


        order.status = req.body.status;


        const updatedOrder = await order.save();


        res.json(updatedOrder);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



module.exports = {

    createOrder,

    getMyOrders,

    getAllOrders,

    updateOrderStatus

};