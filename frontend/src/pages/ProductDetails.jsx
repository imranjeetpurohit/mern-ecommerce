import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import {
    getProductById
} from "../services/productService";

import {
    createReview
} from "../services/reviewService";

import {
    CartContext
} from "../context/CartContext";

import {
    AuthContext
} from "../context/AuthContext";

import {
    FaShoppingCart,
    FaStar
} from "react-icons/fa";



function ProductDetails() {


    const { id } = useParams();


    const {
        addToCart
    } = useContext(CartContext);



    const {
        user
    } = useContext(AuthContext);




    const [product,setProduct] = useState(null);



    const [rating,setRating] = useState(5);


    const [comment,setComment] = useState("");





    useEffect(()=>{


        loadProduct();


    },[]);






    const loadProduct = async()=>{


        const data = await getProductById(id);


        setProduct(data);


    };






   const submitReview = async()=>{


    if(!comment.trim()){

        alert("Please write a review first");

        return;

    }


    try{


        await createReview(

            id,

            {
                rating:Number(rating),
                comment:comment.trim()
            }

        );


        setComment("");

        setRating(5);


        loadProduct();


    }
    catch(error){

        console.log(
            error.response?.data || error
        );

        alert(
            error.response?.data?.message ||
            "Failed to submit review"
        );

    }


};







    if(!product){


        return (

            <h1 className="
            text-center
            text-2xl
            mt-10
            ">

            Loading...

            </h1>

        );

    }






    return (


    <div className="
    max-w-6xl
    mx-auto
    bg-white
    rounded-2xl
    shadow-lg
    p-8
    ">





        {/* Product Section */}



        <div className="
        grid
        md:grid-cols-2
        gap-10
        ">



            <img

            src={
            `http://localhost:8000${product.image}`
            }

            alt={product.name}

            className="
            w-full
            h-96
            object-cover
            rounded-2xl
            "

            />





            <div>



                <h1 className="
                text-4xl
                font-bold
                text-gray-800
                ">

                    {product.name}

                </h1>




                <p className="
                text-gray-600
                mt-5
                leading-7
                ">

                    {product.description}

                </p>




                <h2 className="
                text-3xl
                font-bold
                text-blue-600
                mt-5
                ">

                    ₹ {product.price}

                </h2>






                <div className="
                flex
                items-center
                gap-2
                mt-4
                text-yellow-500
                ">


                    <FaStar/>

                    {product.rating}

                    <span className="
                    text-gray-500
                    ">

                    ({product.numReviews} reviews)

                    </span>


                </div>







                <button

                onClick={()=>
                    addToCart(product)
                }

                className="
                mt-6
                bg-blue-600
                text-white
                px-8
                py-3
                rounded-xl
                flex
                items-center
                gap-3
                font-semibold
                hover:bg-blue-700
                transition
                "

                >

                <FaShoppingCart/>

                Add To Cart


                </button>




            </div>



        </div>







        {/* Reviews */}




        <div className="
        mt-12
        ">


            <h2 className="
            text-2xl
            font-bold
            mb-5
            ">

            Customer Reviews

            </h2>





            {

            product.reviews.length===0

            ?

            (

                <p className="
                text-gray-500
                ">

                No reviews yet

                </p>

            )


            :

            (

            product.reviews.map(review=>(


                <div

                key={review._id}

                className="
                border
                rounded-xl
                p-5
                mb-4
                bg-gray-50
                "

                >


                    <h4 className="
                    font-bold
                    ">

                    {review.name}

                    </h4>



                    <p className="
                    text-yellow-500
                    mt-2
                    ">

                    ⭐ {review.rating}

                    </p>



                    <p className="
                    mt-2
                    text-gray-700
                    ">

                    {review.comment}

                    </p>



                </div>


            ))

            )

            }



        </div>







        {/* Add Review */}



        {

        user &&

        <div className="
        mt-10
        border-t
        pt-8
        ">


            <h2 className="
            text-2xl
            font-bold
            mb-5
            ">

            Write Review

            </h2>




            <select

            value={rating}

            onChange={
            e=>setRating(Number(e.target.value))
            }

            className="
            border
            rounded-lg
            px-4
            py-2
            "

            >

                <option value="1">
                1 ⭐
                </option>


                <option value="2">
                2 ⭐
                </option>


                <option value="3">
                3 ⭐
                </option>


                <option value="4">
                4 ⭐
                </option>


                <option value="5">
                5 ⭐
                </option>


            </select>






            <textarea

            placeholder="Write your review..."

            value={comment}

            onChange={
            e=>setComment(e.target.value)
            }

            className="
            w-full
            border
            rounded-xl
            p-4
            mt-4
            h-32
            "

            />







            <button

            onClick={submitReview}

            className="
            mt-4
            bg-green-600
            text-white
            px-7
            py-3
            rounded-xl
            hover:bg-green-700
            transition
            "

            >

            Submit Review

            </button>



        </div>

        }




    </div>


    );


}


export default ProductDetails;