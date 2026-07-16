const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    createProduct,
    createBulkProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct

} = require("../controllers/productController");


// Public routes

router.get("/", getProducts);

router.get("/:id", getProductById);


// Admin routes

router.post(
"/",
protect,
admin,
upload.single("image"),
createProduct
);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);


module.exports = router;