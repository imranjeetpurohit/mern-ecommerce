import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";


function Checkout(){


const navigate = useNavigate();



const {
cartItems,
clearCart

}=useContext(CartContext);




const [address,setAddress]=useState({

address:"",
city:"",
postalCode:"",
country:"India"

});



const [error,setError]=useState("");

const [loading,setLoading]=useState(false);






const totalPrice = cartItems.reduce(

(sum,item)=>

sum + item.price * item.quantity,

0

);








const handleChange=(e)=>{


setAddress({

...address,

[e.target.name]:e.target.value

});


};









const placeOrder=async()=>{


setError("");




if(cartItems.length===0){


setError("Your cart is empty");


return;


}






if(

!address.address.trim() ||

!address.city.trim() ||

!address.postalCode.trim() ||

!address.country.trim()

){


setError("Please fill all shipping details");


return;


}







try{


setLoading(true);





const orderData={



orderItems:cartItems.map(item=>(


{

name:item.name,

quantity:item.quantity,

image:item.image,

price:item.price,

product:item._id

}


)),




shippingAddress:address,



paymentMethod:"COD",



totalPrice



};






await createOrder(orderData);





clearCart();




navigate("/orders");




}
catch(err){



setError(

err.response?.data?.message ||

"Order failed. Try again."

);



}
finally{


setLoading(false);


}



};









return (



<div className="

min-h-screen

bg-gradient-to-br

from-slate-100

via-blue-50

to-indigo-100

py-10

px-5

">






<h1 className="

text-4xl

font-extrabold

text-center

text-gray-800

mb-10

">

Checkout

</h1>









<div className="

max-w-6xl

mx-auto

grid

lg:grid-cols-2

gap-8

">







{/* Shipping Form */}



<div className="

bg-white

rounded-3xl

shadow-xl

p-8

">





<h2 className="

text-2xl

font-bold

text-gray-800

mb-6

">

Shipping Address

</h2>






{

error &&

<div className="

bg-red-100

text-red-600

rounded-xl

p-4

mb-6

text-center

font-semibold

">

{error}

</div>

}








<div className="

space-y-5

">





<input

name="address"

placeholder="Full Address"

value={address.address}

onChange={handleChange}

className="

w-full

h-14

rounded-2xl

border

border-gray-300

px-5

outline-none

focus:ring-4

focus:ring-indigo-200

transition

"

/>






<input

name="city"

placeholder="City"

value={address.city}

onChange={handleChange}

className="

w-full

h-14

rounded-2xl

border

border-gray-300

px-5

outline-none

focus:ring-4

focus:ring-indigo-200

transition

"

/>






<input

name="postalCode"

placeholder="Postal Code"

value={address.postalCode}

onChange={handleChange}

className="

w-full

h-14

rounded-2xl

border

border-gray-300

px-5

outline-none

focus:ring-4

focus:ring-indigo-200

transition

"

/>






<input

name="country"

placeholder="Country"

value={address.country}

onChange={handleChange}

className="

w-full

h-14

rounded-2xl

border

border-gray-300

px-5

outline-none

focus:ring-4

focus:ring-indigo-200

transition

"

/>







</div>






</div>









{/* Order Summary */}



<div className="

bg-white

rounded-3xl

shadow-xl

p-8

h-fit

">





<h2 className="

text-2xl

font-bold

text-gray-800

mb-6

">

Order Summary

</h2>







<div className="

space-y-4

">



{

cartItems.map(item=>(


<div

key={item._id}

className="

flex

justify-between

items-center

bg-gray-50

rounded-xl

p-4

"

>


<div>


<h3 className="

font-semibold

text-gray-800

">

{item.name}

</h3>


<p className="

text-gray-500

">

Quantity: {item.quantity}

</p>


</div>





<p className="

font-bold

text-indigo-600

">

₹ {item.price * item.quantity}

</p>





</div>



))

}





</div>









<div className="

border-t

mt-6

pt-6

flex

justify-between

text-2xl

font-extrabold

">


<span>

Total

</span>



<span className="

text-indigo-600

">

₹ {totalPrice}

</span>



</div>








<div className="

mt-6

bg-green-100

text-green-700

rounded-xl

p-4

text-center

font-semibold

">

Payment Method: Cash On Delivery

</div>









<button


onClick={placeOrder}


disabled={loading}


className="

w-full

mt-8

h-14

rounded-2xl

bg-gradient-to-r

from-indigo-600

via-purple-600

to-pink-500

text-white

font-bold

text-lg

shadow-xl

hover:scale-105

transition

disabled:opacity-50

"

>


{

loading

?

"Placing Order..."

:

"Place Order"

}


</button>






</div>








</div>







</div>


);


}


export default Checkout;