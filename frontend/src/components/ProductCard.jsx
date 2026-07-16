import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { CartContext } from "../context/CartContext";

import {
    addWishlist,
    removeWishlist
} from "../services/wishlistService";

import {
    FaHeart,
    FaShoppingCart
} from "react-icons/fa";



function ProductCard({ product }) {


    const {

        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity

    } = useContext(CartContext);



    const [liked, setLiked] = useState(false);




    const cartProduct = cartItems.find(

        item => item._id === product._id

    );







    const handleWishlist = async () => {


        try {


            if (liked) {


                await removeWishlist(product._id);


                setLiked(false);


            } 
            else {


                await addWishlist(product._id);


                setLiked(true);


            }


        } 
        catch (error) {


            console.log(error);


        }


    };






    return (


        <div className="
        bg-white
        rounded-2xl
        shadow-lg
        p-5
        relative
        hover:shadow-2xl
        hover:-translate-y-1
        transition
        duration-300
        ">





            <Link to={`/product/${product._id}`}>



                {
                    product.image &&


                    <img

                    src={`https://mern-ecommerce-rhhf.onrender.com${product.image}`}

                    alt={product.name}

                    className="
                    w-full
                    h-52
                    object-cover
                    rounded-xl
                    "

                    />


                }





                <h3 className="
                text-xl
                font-bold
                mt-4
                text-gray-800
                ">

                {product.name}

                </h3>



            </Link>






            <p className="
            text-blue-600
            font-bold
            text-lg
            mt-2
            ">

            ₹ {product.price}

            </p>









            <div className="
            flex
            gap-3
            mt-5
            items-center
            ">






            {

            cartProduct

            ?

            (


            <div className="
            flex
            items-center
            justify-between
            flex-1
            bg-blue-100
            rounded-xl
            px-3
            py-2
            ">



                <button

                onClick={()=>
                    decreaseQuantity(product._id)
                }

                className="
                w-10
                h-10
                rounded-full
                bg-white
                text-blue-600
                text-xl
                font-bold
                shadow
                hover:bg-blue-600
                hover:text-white
                transition
                "

                >

                -

                </button>






                <span className="
                text-xl
                font-bold
                text-gray-800
                ">

                {cartProduct.quantity}

                </span>







                <button

                onClick={()=>
                    increaseQuantity(product._id)
                }

                className="
                w-10
                h-10
                rounded-full
                bg-blue-600
                text-white
                text-xl
                font-bold
                hover:bg-blue-700
                transition
                "

                >

                +

                </button>



            </div>


            )


            :


            (


            <button


            onClick={()=>
                addToCart(product)
            }


            className="
            flex-1
            bg-blue-600
            text-white
            py-3
            rounded-xl
            flex
            items-center
            justify-center
            gap-2
            font-semibold
            hover:bg-blue-700
            transition
            "

            >

            <FaShoppingCart/>


            Add To Cart


            </button>


            )

            }









            {/* Wishlist */}



            <button


            onClick={handleWishlist}


            className={`

            px-5

            h-12

            rounded-xl

            border

            flex

            items-center

            justify-center

            text-xl

            transition


            ${
                liked

                ?

                "bg-red-500 border-red-500 text-white"

                :

                "bg-white border-gray-300 text-gray-400 hover:text-red-500"

            }

            `}


            >


            <FaHeart/>


            </button>






            </div>





        </div>


    );


}


export default ProductCard;