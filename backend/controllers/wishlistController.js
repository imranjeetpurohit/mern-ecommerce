const User = require("../models/User");



// Add Wishlist

const addWishlist = async(req,res)=>{

try{


const user = await User.findById(
req.user._id
);


if(!user.wishlist.includes(req.params.id)){


    user.wishlist.push(
        req.params.id
    );


}


await user.save();


res.json({
message:"Added to wishlist"
});


}
catch(error){

res.status(500).json({
message:error.message
});

}

};





// Remove Wishlist


const removeWishlist = async(req,res)=>{


try{


const user = await User.findById(
req.user._id
);



user.wishlist =
user.wishlist.filter(

item =>
item.toString() !== req.params.id

);



await user.save();


res.json({
message:"Removed from wishlist"
});


}
catch(error){

res.status(500).json({
message:error.message
});

}


};





// Get Wishlist


const getWishlist = async(req,res)=>{


try{


const user = await User.findById(
req.user._id
)
.populate("wishlist");


res.json(
user.wishlist
);


}
catch(error){

res.status(500).json({
message:error.message
});

}


};



module.exports = {

addWishlist,

removeWishlist,

getWishlist

};