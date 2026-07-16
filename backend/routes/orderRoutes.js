const express = require("express");
const router = express.Router();


const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");


const {

createOrder,
getMyOrders,
getAllOrders,
updateOrderStatus

}=require("../controllers/orderController");



// User routes

router.post("/",protect,createOrder);

router.get("/my",protect,getMyOrders);


// Admin routes

router.get("/",protect,admin,getAllOrders);

router.put("/:id",protect,admin,updateOrderStatus);



module.exports=router;