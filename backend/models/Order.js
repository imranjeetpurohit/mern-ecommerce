const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    orderItems:[
        {
            name:{
                type:String,
                required:true
            },

            quantity:{
                type:Number,
                required:true
            },

            image:{
                type:String
            },

            price:{
                type:Number,
                required:true
            },

            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            }
        }
    ],


    shippingAddress:{
        address:{
            type:String,
            required:true
        },

        city:{
            type:String,
            required:true
        },

        postalCode:{
            type:String,
            required:true
        },

        country:{
            type:String,
            required:true
        }
    },


    paymentMethod:{
        type:String,
        default:"COD"
    },


    totalPrice:{
        type:Number,
        required:true
    },


    status:{
        type:String,
        default:"Processing"
    },


    isPaid:{
        type:Boolean,
        default:false
    },


    paidAt:{
        type:Date
    }


},
{
    timestamps:true
});


module.exports = mongoose.model("Order",orderSchema);