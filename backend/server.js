const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const wishlistRoutes =
require("./routes/wishlistRoutes");

dotenv.config();


// Connect Database
connectDB();


const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Serve uploaded images
app.use(
    "/uploads",
    express.static("uploads")
);


// API Routes

app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/users",
    userRoutes
);


app.use(
    "/api/products",
    productRoutes
);


app.use(
    "/api/orders",
    orderRoutes
);


app.use(
    "/api/reviews",
    reviewRoutes
);

app.use(
"/api/wishlist",
wishlistRoutes
);

// Test Route

app.get("/", (req,res)=>{

    res.send("API is running 🚀");

});



// Server

const PORT = process.env.PORT || 8000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});