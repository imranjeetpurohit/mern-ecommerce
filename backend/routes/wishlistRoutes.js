const express = require("express");

const router = express.Router();


const protect =
require("../middleware/authMiddleware");


const {

addWishlist,

removeWishlist,

getWishlist

}=require("../controllers/wishlistController");



router.get(
"/",
protect,
getWishlist
);



router.post(
"/:id",
protect,
addWishlist
);



router.delete(
"/:id",
protect,
removeWishlist
);



module.exports = router;