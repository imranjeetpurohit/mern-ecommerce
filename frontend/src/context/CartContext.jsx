import { createContext, useState, useEffect } from "react";


export const CartContext = createContext();


export const CartProvider = ({ children }) => {


    const [cartItems, setCartItems] = useState([]);



    useEffect(() => {

        const savedCart = localStorage.getItem("cart");

        if (savedCart) {

            setCartItems(JSON.parse(savedCart));

        }

    }, []);



    const addToCart = (product) => {


        const exist = cartItems.find(
            item => item._id === product._id
        );


        let updatedCart;


        if (exist) {

            updatedCart = cartItems.map(item =>
                item._id === product._id
                    ?
                    {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    :
                    item
            );

        } else {

            updatedCart = [
                ...cartItems,
                {
                    ...product,
                    quantity: 1
                }
            ];

        }


        setCartItems(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

    };



    const removeFromCart = (id) => {


        const updatedCart = cartItems.filter(
            item => item._id !== id
        );


        setCartItems(updatedCart);


        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );


    };

    const increaseQuantity = (id) => {

        const updatedCart = cartItems.map(item =>
            item._id === id
                ?
                {
                    ...item,
                    quantity: item.quantity + 1
                }
                :
                item
        );


        setCartItems(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

    };



    const decreaseQuantity = (id) => {


    const updatedCart = cartItems
        .map(item => {

            if (item._id === id) {

                return {
                    ...item,
                    quantity: item.quantity - 1
                };

            }

            return item;

        })
        .filter(item => item.quantity > 0);



    setCartItems(updatedCart);



    localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
    );


};

    const clearCart = () => {

        setCartItems([]);

        localStorage.removeItem("cart");

    };

    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart
            }}
        >

            {children}

        </CartContext.Provider>

    );


};