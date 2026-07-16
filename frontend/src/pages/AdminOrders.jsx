import {
    useEffect,
    useState
} from "react";


import {
    getAllOrders,
    updateOrderStatus
} from "../services/adminOrderService";


import {
    FaBox,
    FaUser,
    FaEnvelope,
    FaRupeeSign,
    FaTruck,
    FaCheckCircle,
    FaSearch,
    FaClock
} from "react-icons/fa";




function AdminOrders(){



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


            const data=await getAllOrders();


            setOrders(data);


        }
        catch(err){


            setError(
                err.response?.data?.message ||
                "Failed to load orders"
            );


        }
        finally{


            setLoading(false);


        }


    };








    const changeStatus=async(id,status)=>{


        try{


            await updateOrderStatus(

                id,

                status

            );


            loadOrders();


        }
        catch(error){


            console.log(error);


        }


    };








    const statusStyle=(status)=>{


        if(status==="Delivered")

            return "bg-green-100 text-green-700";


        if(status==="Shipped")

            return "bg-blue-100 text-blue-700";



        return "bg-yellow-100 text-yellow-700";


    };








    const filteredOrders = orders.filter(order=>{


        const matchStatus =

            filterStatus==="All"

            ||

            order.status===filterStatus;




        const searchText = search.toLowerCase();



        const matchSearch =

            order._id.toLowerCase().includes(searchText)

            ||

            order.user?.name
            ?.toLowerCase()
            .includes(searchText)

            ||

            order.user?.email
            ?.toLowerCase()
            .includes(searchText);



        return matchStatus && matchSearch;


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
            flex
            justify-center
            items-center
            h-64
            text-xl
            font-semibold
            ">

                Loading Orders...

            </div>

        );


    }







    return (



        <div className="
        max-w-7xl
        mx-auto
        px-5
        py-10
        ">





            {/* Header */}



            <div className="
            bg-gradient-to-r
            from-indigo-600
            via-purple-600
            to-pink-500
            rounded-3xl
            p-8
            text-white
            shadow-xl
            mb-8
            ">



                <div className="
                flex
                items-center
                gap-5
                ">


                    <div className="
                    bg-white/20
                    p-5
                    rounded-2xl
                    ">

                        <FaBox className="text-4xl"/>

                    </div>




                    <div>


                        <h1 className="
                        text-4xl
                        font-extrabold
                        ">

                            Admin Orders

                        </h1>


                        <p className="
                        opacity-80
                        mt-2
                        ">

                            Manage customer orders

                        </p>


                    </div>



                </div>



            </div>









            {
                error &&

                <div className="
                bg-red-100
                text-red-600
                p-4
                rounded-xl
                mb-6
                font-semibold
                ">

                    {error}

                </div>
            }








            {/* Statistics */}



            <div className="
            grid
            md:grid-cols-4
            gap-5
            mb-8
            ">




                <div className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
                ">

                    <h3 className="
                    text-gray-500
                    ">

                        Total Orders

                    </h3>


                    <p className="
                    text-3xl
                    font-bold
                    text-indigo-600
                    mt-2
                    ">

                        {totalOrders}

                    </p>


                </div>






                <div className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
                ">


                    <h3 className="
                    text-gray-500
                    flex
                    gap-2
                    items-center
                    ">

                        <FaClock/>

                        Processing

                    </h3>



                    <p className="
                    text-3xl
                    font-bold
                    text-yellow-600
                    mt-2
                    ">

                        {processingOrders}

                    </p>


                </div>







                <div className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
                ">


                    <h3 className="
                    text-gray-500
                    flex
                    gap-2
                    items-center
                    ">

                        <FaTruck/>

                        Shipped

                    </h3>


                    <p className="
                    text-3xl
                    font-bold
                    text-blue-600
                    mt-2
                    ">

                        {shippedOrders}

                    </p>


                </div>







                <div className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
                ">


                    <h3 className="
                    text-gray-500
                    flex
                    gap-2
                    items-center
                    ">

                        <FaCheckCircle/>

                        Delivered

                    </h3>


                    <p className="
                    text-3xl
                    font-bold
                    text-green-600
                    mt-2
                    ">

                        {deliveredOrders}

                    </p>


                </div>




            </div>







            {/* Search + Filter */}



            <div className="
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

                    placeholder="
                    Search order id or customer
                    "

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


                </select>



            </div>
                            {/* Orders List */}



                {
                    filteredOrders.length === 0 ?


                    (

                        <div className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        p-10
                        text-center
                        ">


                            <h2 className="
                            text-2xl
                            font-bold
                            text-gray-600
                            ">

                                No Orders Found

                            </h2>


                        </div>

                    )


                    :



                    (

                    <div className="
                    space-y-8
                    ">


                    {

                    filteredOrders.map(order=>(



                        <div

                        key={order._id}

                        className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        p-7
                        hover:shadow-2xl
                        transition
                        "



                        >





                            {/* Order Header */}



                            <div className="
                            flex
                            justify-between
                            items-start
                            flex-wrap
                            gap-5
                            ">



                                <div>


                                    <h2 className="
                                    text-xl
                                    font-bold
                                    text-gray-800
                                    ">

                                        Order ID

                                    </h2>



                                    <p className="
                                    text-gray-500
                                    break-all
                                    mt-2
                                    ">

                                        {order._id}

                                    </p>


                                </div>





                                <span className={`
                                px-5
                                py-2
                                rounded-full
                                font-semibold
                                ${statusStyle(order.status)}
                                `}>

                                    {order.status}

                                </span>



                            </div>








                            <hr className="
                            my-6
                            "/>









                            {/* Customer Information */}




                            <div className="
                            grid
                            md:grid-cols-3
                            gap-5
                            ">




                                <div className="
                                bg-gray-50
                                rounded-xl
                                p-5
                                ">


                                    <h3 className="
                                    font-bold
                                    flex
                                    items-center
                                    gap-2
                                    mb-3
                                    ">

                                        <FaUser/>

                                        Customer

                                    </h3>



                                    <p>

                                    {order.user?.name || "Guest"}

                                    </p>


                                </div>







                                <div className="
                                bg-gray-50
                                rounded-xl
                                p-5
                                ">


                                    <h3 className="
                                    font-bold
                                    flex
                                    items-center
                                    gap-2
                                    mb-3
                                    ">

                                        <FaEnvelope/>

                                        Email

                                    </h3>



                                    <p className="
                                    break-all
                                    ">

                                    {order.user?.email}

                                    </p>


                                </div>








                                <div className="
                                bg-gray-50
                                rounded-xl
                                p-5
                                ">


                                    <h3 className="
                                    font-bold
                                    flex
                                    items-center
                                    gap-2
                                    mb-3
                                    ">

                                        <FaRupeeSign/>

                                        Total

                                    </h3>




                                    <p className="
                                    text-indigo-600
                                    font-bold
                                    text-xl
                                    ">

                                        ₹ {order.totalPrice}

                                    </p>


                                </div>




                            </div>









                            {/* Status Update */}





                            <div className="
                            mt-7
                            flex
                            items-center
                            gap-4
                            flex-wrap
                            ">




                                <label className="
                                flex
                                items-center
                                gap-2
                                font-semibold
                                ">

                                    <FaTruck/>

                                    Update Status

                                </label>






                                <select


                                value={order.status}


                                onChange={(e)=>

                                    changeStatus(

                                        order._id,

                                        e.target.value

                                    )

                                }


                                className="
                                border
                                border-gray-300
                                rounded-xl
                                px-5
                                py-3
                                outline-none
                                focus:ring-4
                                focus:ring-indigo-100
                                "

                                >



                                    <option value="Processing">

                                        Processing

                                    </option>



                                    <option value="Shipped">

                                        Shipped

                                    </option>



                                    <option value="Delivered">

                                        Delivered

                                    </option>



                                </select>




                            </div>









                            {/* Products */}





                            <div className="
                            mt-8
                            ">



                                <h3 className="
                                text-xl
                                font-bold
                                mb-4
                                flex
                                items-center
                                gap-2
                                ">


                                    <FaCheckCircle/>

                                    Products


                                </h3>






                                <div className="
                                space-y-3
                                ">


                                {


                                order.orderItems.map(item=>(



                                    <div

                                    key={item.product}

                                    className="
                                    bg-gray-50
                                    rounded-xl
                                    p-4
                                    flex
                                    justify-between
                                    items-center
                                    "

                                    >



                                        <div>


                                            <p className="
                                            font-semibold
                                            ">

                                                {item.name}

                                            </p>



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

                                            ₹ {item.price}

                                        </p>





                                    </div>



                                ))



                                }




                                </div>




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



export default AdminOrders;