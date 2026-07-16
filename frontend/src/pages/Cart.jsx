import {useContext} from "react";
import {CartContext} from "../context/CartContext";
import {Link} from "react-router-dom";


function Cart(){


const {

cartItems,
removeFromCart,
increaseQuantity,
decreaseQuantity

}=useContext(CartContext);





const total = cartItems.reduce(

(sum,item)=>

sum + item.price * item.quantity,

0

);





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

🛒 Shopping Cart

</h1>









{

cartItems.length === 0

?

(

<div className="
max-w-md
mx-auto
bg-white
rounded-3xl
shadow-xl
p-10
text-center
">


<div className="
text-6xl
mb-5
">

🛍️

</div>



<h2 className="
text-2xl
font-bold
text-gray-700
">

Cart is empty

</h2>



<Link to="/">

<button

className="
mt-6
px-8
py-3
rounded-xl
bg-gradient-to-r
from-indigo-600
to-purple-600
text-white
font-bold
hover:scale-105
transition
"

>

Continue Shopping

</button>

</Link>



</div>

)

:

(



<div className="
max-w-6xl
mx-auto
grid
lg:grid-cols-3
gap-8
">








{/* Products */}



<div className="
lg:col-span-2
space-y-5
">






{

cartItems.map(item=>(


<div

key={item._id}

className="
bg-white
rounded-3xl
shadow-lg
p-6
flex
items-center
gap-6
"

>







<img

src={`https://mern-ecommerce-rhhf.onrender.com${product.image}`}

alt={item.name}

className="
w-28
h-28
rounded-2xl
object-cover
shadow
"

/>







<div className="
flex-1
">


<h2 className="
text-xl
font-bold
text-gray-800
">

{item.name}

</h2>



<p className="
text-indigo-600
font-bold
text-lg
mt-2
">

₹ {item.price}

</p>








<div className="
flex
items-center
gap-4
mt-4
">


<button

onClick={()=>decreaseQuantity(item._id)}

className="
w-10
h-10
rounded-full
bg-gray-200
font-bold
text-xl
hover:bg-gray-300
"

>

-

</button>





<span className="
text-xl
font-bold
">

{item.quantity}

</span>





<button

onClick={()=>increaseQuantity(item._id)}

className="
w-10
h-10
rounded-full
bg-indigo-600
text-white
font-bold
text-xl
hover:bg-indigo-700
"

>

+

</button>



</div>






</div>








<button

onClick={()=>removeFromCart(item._id)}

className="
bg-red-500
text-white
px-5
py-2
rounded-xl
font-semibold
hover:bg-red-600
transition
"

>

Remove

</button>







</div>


))


}






</div>









{/* Summary */}



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
flex
justify-between
text-lg
mb-4
">


<span>

Items

</span>


<span className="
font-bold
">

{cartItems.length}

</span>


</div>








<div className="
border-t
pt-5
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

₹ {total}

</span>


</div>







<Link to="/checkout">


<button

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
shadow-lg
hover:scale-105
transition
"

>

Proceed Checkout

</button>


</Link>




</div>








</div>


)


}







</div>


);


}


export default Cart;