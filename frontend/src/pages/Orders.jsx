import {
    useEffect,
    useState
} from "react";

import {
    getMyOrders
} from "../services/orderService";


import {
    FaSearch,
    FaBox,
    FaTruck,
    FaCheckCircle,
    FaClock
} from "react-icons/fa";



function Orders(){


const [orders,setOrders]=useState([]);


const [loading,setLoading]=useState(true);


const [error,setError]=useState("");



const [filterStatus,setFilterStatus]=useState("All");


const [search,setSearch]=useState("");






useEffect(()=>{

loadOrders();

},[]);







const loadOrders=async()=>{


try{


setLoading(true);


const data = await getMyOrders();


setOrders(data);


}

catch(err){


setError(
err.response?.data?.message ||
"Unable to load orders"
);


}

finally{


setLoading(false);


}


};







const filteredOrders = orders.filter(order=>{


const statusMatch =

filterStatus==="All"

||

order.status===filterStatus;



const searchMatch =

order._id
.toLowerCase()
.includes(search.toLowerCase());



return statusMatch && searchMatch;


});






const totalOrders = orders.length;


const processingOrders = orders.filter(
order=>order.status==="Processing"
).length;



const shippedOrders = orders.filter(
order=>order.status==="Shipped"
).length;



const deliveredOrders = orders.filter(
order=>order.status==="Delivered"
).length;








if(loading){


return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-slate-100
via-blue-50
to-indigo-100
">


<h1 className="
text-2xl
font-bold
text-gray-700
">

Loading Orders...

</h1>


</div>

);


}









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

📦 My Orders

</h1>









{
error &&

<div className="
max-w-md
mx-auto
bg-red-100
text-red-600
rounded-xl
p-4
text-center
font-semibold
mb-6
">

{error}

</div>

}








{/* Statistics */}



<div className="
max-w-5xl
mx-auto
grid
md:grid-cols-4
gap-5
mb-8
">



<div className="
bg-white
rounded-2xl
shadow-lg
p-5
">

<p className="text-gray-500">
Total Orders
</p>

<h2 className="
text-3xl
font-bold
text-indigo-600
">

{totalOrders}

</h2>

</div>





<div className="
bg-white
rounded-2xl
shadow-lg
p-5
">

<p className="
text-gray-500
flex
items-center
gap-2
">

<FaClock/>

Processing

</p>


<h2 className="
text-3xl
font-bold
text-yellow-600
">

{processingOrders}

</h2>

</div>






<div className="
bg-white
rounded-2xl
shadow-lg
p-5
">


<p className="
text-gray-500
flex
items-center
gap-2
">

<FaTruck/>

Shipped

</p>


<h2 className="
text-3xl
font-bold
text-blue-600
">

{shippedOrders}

</h2>


</div>







<div className="
bg-white
rounded-2xl
shadow-lg
p-5
">


<p className="
text-gray-500
flex
items-center
gap-2
">

<FaCheckCircle/>

Delivered

</p>


<h2 className="
text-3xl
font-bold
text-green-600
">

{deliveredOrders}

</h2>


</div>



</div>










{/* Search + Filter */}



<div className="
max-w-5xl
mx-auto
bg-white
rounded-2xl
shadow-lg
p-5
mb-8
flex
gap-5
flex-wrap
">



<div className="
flex
items-center
gap-3
border
rounded-xl
px-4
flex-1
">


<FaSearch className="text-gray-400"/>


<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="Search Order ID"

className="
w-full
py-3
outline-none
"

/>


</div>





<select

value={filterStatus}

onChange={
e=>setFilterStatus(e.target.value)
}

className="
border
rounded-xl
px-5
py-3
"

>


<option value="All">
All Orders
</option>


<option value="Processing">
Processing
</option>


<option value="Shipped">
Shipped
</option>


<option value="Delivered">
Delivered
</option>


<option value="Cancelled">
Cancelled
</option>



</select>



</div>









{

filteredOrders.length===0

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

🛒

</div>



<h2 className="
text-2xl
font-bold
text-gray-700
">

No orders found

</h2>


</div>

)


:

(



<div className="
max-w-5xl
mx-auto
space-y-6
">


{

filteredOrders.map(order=>(


<div

key={order._id}

className="
bg-white
rounded-3xl
shadow-xl
p-8
"

>





<div className="
flex
flex-col
md:flex-row
justify-between
gap-4
mb-6
">



<div>

<h2 className="
text-xl
font-bold
">

Order ID

</h2>


<p className="
text-gray-500
break-all
">

{order._id}

</p>


</div>





<span className={`
px-4
py-2
rounded-full
font-bold

${
order.status==="Delivered"

?

"bg-green-100 text-green-700"

:

order.status==="Shipped"

?

"bg-blue-100 text-blue-700"

:

order.status==="Cancelled"

?

"bg-red-100 text-red-700"

:

"bg-yellow-100 text-yellow-700"

}

`}>

{order.status}

</span>




</div>








<div className="
bg-indigo-50
rounded-2xl
p-5
mb-6
flex
justify-between
items-center
">


<h3 className="
font-bold
">

Total Amount

</h3>


<p className="
text-2xl
font-extrabold
text-indigo-600
">

₹ {order.totalPrice}

</p>



</div>








<h3 className="
text-xl
font-bold
mb-4
">

Products

</h3>






<div className="
space-y-4
">


{

order.orderItems.map(item=>(


<div

key={item.product}

className="
flex
justify-between
bg-gray-50
rounded-2xl
p-5
"


>


<div>

<h4 className="font-bold">

{item.name}

</h4>


<p className="text-gray-500">

Quantity: {item.quantity}

</p>


</div>



<p className="
font-bold
text-indigo-600
">

₹ {item.price}

</p>



</div>


))

}



</div>






</div>


))

}



</div>


)

}



</div>


);


}


export default Orders;