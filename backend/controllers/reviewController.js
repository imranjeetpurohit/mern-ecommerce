const Review = require("../models/Review");

const Product = require("../models/Product");



// Add Review

const createReview = async(req,res)=>{


try{


const {
rating,
comment
}=req.body;



const product = await Product.findById(
req.params.id
);



if(!product){

return res.status(404).json({
message:"Product not found"
});

}




const alreadyReviewed =
product.reviews.find(
r=>r.user.toString() === req.user._id.toString()
);



if(alreadyReviewed){

return res.status(400).json({
message:"Product already reviewed"
});

}



const review={

user:req.user._id,

name:req.user.name,

rating:Number(rating),

comment

};



product.reviews.push(review);



product.numReviews =
product.reviews.length;



product.rating =
product.reviews.reduce(
(acc,item)=>acc+item.rating,
0
)
/
product.reviews.length;



await product.save();



res.status(201).json({
message:"Review added"
});



}
catch(error){

res.status(500).json({
message:error.message
});

}


};




module.exports={
createReview
};