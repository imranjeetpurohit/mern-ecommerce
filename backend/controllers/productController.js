const Product = require("../models/Product");


// Create Product
const createProduct = async (req, res) => {

    try {

        const product = await Product.create({

            ...req.body,

            image: req.file
                ? `/uploads/${req.file.filename}`
                : "",

            user: req.user._id

        });


        res.status(201).json(product);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Get All Products
const getProducts = async (req, res) => {

    try {


        const pageSize = 8;

        const page = Number(req.query.page) || 1;



        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i"
                }
            }
            :
            {};



        const category = req.query.category
            ?
            {
                category:req.query.category
            }
            :
            {};



        const priceFilter = {};



        if(req.query.minPrice){

            priceFilter.$gte =
            Number(req.query.minPrice);

        }



        if(req.query.maxPrice){

            priceFilter.$lte =
            Number(req.query.maxPrice);

        }




        const products = await Product.find({

            ...keyword,

            ...category,

            ...(Object.keys(priceFilter).length
                ?
                {
                    price:priceFilter
                }
                :
                {}
            )

        })

        .limit(pageSize)

        .skip(
            pageSize * (page - 1)
        );



        const count = await Product.countDocuments({

            ...keyword,

            ...category

        });



        res.json({

            products,

            page,

            pages:Math.ceil(
                count / pageSize
            )

        });



    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Get Single Product
const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        res.json(product);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Update Product
const updateProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        Object.assign(product, req.body);


        const updatedProduct = await product.save();


        res.json(updatedProduct);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Delete Product
const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        await product.deleteOne();


        res.json({
            message: "Product deleted"
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Bulk Create Products

const createBulkProducts = async (req, res) => {

    try {

        const products = req.body.map(product => ({
            ...product,
            user: req.user._id
        }));


        const createdProducts = await Product.insertMany(products);


        res.status(201).json({
            message: "Products added successfully",
            count: createdProducts.length,
            products: createdProducts
        });


    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createProduct,
    createBulkProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};