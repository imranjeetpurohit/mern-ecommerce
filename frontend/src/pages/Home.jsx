import {
useEffect,
useState
} from "react";

import api from "../services/api";

import ProductCard from "../components/ProductCard";



function Home(){


const [products,setProducts]=useState([]);

const [keyword,setKeyword]=useState("");

const [page,setPage]=useState(1);

const [pages,setPages]=useState(1);

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");







// Load products when page changes

useEffect(()=>{

loadProducts();

},[page]);







// Live search after 3 characters

useEffect(()=>{


const timer=setTimeout(()=>{


if(keyword.length >= 3 || keyword.length === 0){


setPage(1);

loadProducts();


}


},500);



return ()=>clearTimeout(timer);



},[keyword]);








const loadProducts=async()=>{


try{


setLoading(true);

setError("");



const res=await api.get(

`/products?page=${page}&keyword=${keyword}`

);



setProducts(

res.data.products

);



setPages(

res.data.pages

);



}

catch(err){


setError(

err.response?.data?.message ||

"Failed to load products"

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








{/* Header */}



<div className="

max-w-7xl

mx-auto

text-center

mb-10

">



<h1 className="

text-5xl

font-extrabold

text-gray-800

">

Discover Products

</h1>




<p className="

text-gray-600

mt-4

text-lg

">

Shop premium products at great prices

</p>



</div>









{/* Search Box */}



<div className="

max-w-3xl

mx-auto

mb-10

">


<input


placeholder="Search products..."

value={keyword}


onChange={(e)=>

setKeyword(e.target.value)

}


className="

w-full

h-14

rounded-2xl

bg-white

border

border-gray-300

px-6

shadow-lg

outline-none

focus:ring-4

focus:ring-indigo-200

transition

"

/>



<p className="

text-center

text-sm

text-gray-500

mt-3

">

Type at least 3 characters to search

</p>



</div>









{/* Loading */}



{

loading &&


<div className="

text-center

text-xl

font-bold

text-gray-700

mb-6

">

Loading products...

</div>



}








{/* Error */}



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









{/* Empty */}



{

!loading && products.length===0 &&


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

No Products Found

</h2>



<p className="

text-gray-500

mt-2

">

Try another search

</p>



</div>



}









{/* Product Grid */}



<div className="

max-w-7xl

mx-auto

grid

grid-cols-1

sm:grid-cols-2

md:grid-cols-3

lg:grid-cols-4

gap-8

">



{

products.map(product=>(


<ProductCard

key={product._id}

product={product}

/>


))


}



</div>









{/* Pagination */}



{

pages > 1 &&


<div className="

flex

justify-center

gap-3

mt-12

">


{


[...Array(pages).keys()].map(x=>(


<button


key={x+1}


onClick={()=>setPage(x+1)}


className={`

w-12

h-12

rounded-full

font-bold

transition


${

page===x+1

?

"bg-indigo-600 text-white shadow-lg"

:

"bg-white text-gray-700 hover:bg-indigo-100"

}


`}


>


{x+1}


</button>



))


}



</div>



}







</div>



);


}


export default Home;