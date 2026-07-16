import {
    useEffect,
    useState
} from "react";


import api from "../services/api";


import {
    createProduct,
    deleteProduct,
    updateProduct
} from "../services/adminService";


import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaBoxOpen,
    FaTimes,
    FaImage
} from "react-icons/fa";




function AdminDashboard(){



const emptyForm={

    name:"",
    description:"",
    price:"",
    category:"",
    stock:""

};




const [products,setProducts]=useState([]);


const [form,setForm]=useState(emptyForm);


const [editForm,setEditForm]=useState(emptyForm);


const [image,setImage]=useState(null);


const [preview,setPreview]=useState("");


const [error,setError]=useState("");


const [editProduct,setEditProduct]=useState(null);





useEffect(()=>{

loadProducts();

},[]);





const loadProducts=async()=>{


try{


const res=await api.get("/products");


setProducts(
res.data.products
);


}
catch(error){

console.log(error);

}


};







const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const validate=(data)=>{


if(!data.name.trim())

return "Product name required";


if(data.name.length < 3)

return "Name must contain minimum 3 characters";



if(!data.description.trim())

return "Description required";



if(!data.category.trim())

return "Category required";



if(!data.price || Number(data.price)<=0)

return "Enter valid price";



if(data.stock==="" || Number(data.stock)<0)

return "Enter valid stock";



return null;


};







const handleImage=(e)=>{


const file=e.target.files[0];


if(!file)
return;



if(!file.type.startsWith("image")){


setError(
"Only image files allowed"
);


return;


}



if(file.size > 2*1024*1024){


setError(
"Image must be less than 2MB"
);


return;


}



setError("");

setImage(file);


setPreview(
URL.createObjectURL(file)
);



};








const submitProduct=async(e)=>{


e.preventDefault();



const validation=validate(form);



if(validation){

setError(validation);

return;

}




if(!image){

setError("Product image required");

return;

}




try{


const data=new FormData();



Object.keys(form).forEach(key=>{


data.append(

key,

form[key]

);


});



data.append(
"image",
image
);



await createProduct(data);



setForm(emptyForm);

setImage(null);

setPreview("");

setError("");



loadProducts();



}
catch(error){


setError(
error.response?.data?.message ||
"Failed to add product"
);


}


};









const deleteHandler=async(id)=>{


if(!window.confirm(
"Delete this product?"
))
return;



await deleteProduct(id);


loadProducts();


};









const openEdit=(product)=>{


setEditProduct(product);



setEditForm({

name:product.name,

description:product.description,

price:product.price,

category:product.category,

stock:product.stock

});


};








const editHandler=async()=>{


const validation=validate(editForm);



if(validation){

setError(validation);

return;

}



await updateProduct(

editProduct._id,

editForm

);



setEditProduct(null);


loadProducts();


};










const Input=({

label,

name,

value,

onChange,

type="text"

})=>(


<div>


<label className="

block

font-semibold

text-gray-700

mb-2

">

{label}

</label>



<input

type={type}

name={name}

value={value}

onChange={onChange}

className="

w-full

border

border-gray-300

rounded-xl

px-4

py-3

outline-none

focus:ring-4

focus:ring-indigo-100

focus:border-indigo-500

transition

"

/>


</div>


);








return(



<div className="

min-h-screen

py-10

px-5

">



<div className="

max-w-7xl

mx-auto

">






{/* HEADER */}


<div className="

bg-gradient-to-r

from-indigo-600

via-purple-600

to-pink-500

rounded-3xl

p-8

text-white

shadow-xl

mb-10

">


<div className="flex items-center gap-5">


<div className="

bg-white/20

p-5

rounded-2xl

">

<FaBoxOpen className="text-4xl"/>

</div>



<div>

<h1 className="

text-4xl

font-extrabold

">

Admin Dashboard

</h1>


<p className="mt-2 opacity-80">

Manage your products

</p>


</div>


</div>


</div>









{/* ADD PRODUCT */}


<div className="

bg-white

rounded-3xl

shadow-xl

p-8

mb-12

">



<h2 className="

text-2xl

font-bold

mb-7

flex

items-center

gap-3

">


<FaPlus/>

Add Product


</h2>





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





<form

onSubmit={submitProduct}

className="

grid

md:grid-cols-2

gap-6

"

>



<Input

label="Product Name"

name="name"

value={form.name}

onChange={handleChange}

/>



<Input

label="Category"

name="category"

value={form.category}

onChange={handleChange}

/>



<Input

label="Price"

name="price"

type="number"

value={form.price}

onChange={handleChange}

/>



<Input

label="Stock"

name="stock"

type="number"

value={form.stock}

onChange={handleChange}

/>






<div className="md:col-span-2">


<label className="

font-semibold

block

mb-2

">

Description

</label>



<textarea

name="description"

value={form.description}

onChange={handleChange}

className="

w-full

border

border-gray-300

rounded-xl

p-4

h-32

outline-none

focus:ring-4

focus:ring-indigo-100

"

/>


</div>







<div className="md:col-span-2">


<label className="font-semibold block mb-2">

Product Image

</label>



<input

type="file"

accept="image/*"

onChange={handleImage}

className="

w-full

border

border-dashed

rounded-xl

p-4

"

/>



</div>







{

preview &&

<img

src={preview}

className="

w-32

h-32

rounded-xl

object-cover

"

/>


}





<button

className="

md:col-span-2

bg-gradient-to-r

from-indigo-600

to-purple-600

text-white

py-4

rounded-xl

font-bold

flex

items-center

justify-center

gap-3

hover:scale-[1.02]

transition

"


>


<FaPlus/>

Add Product


</button>





</form>



</div>









<h2 className="

text-3xl

font-bold

mb-6

">

All Products

</h2>








<div className="

grid

sm:grid-cols-2

lg:grid-cols-3

gap-8

">



{

products.map(product=>(


<div

key={product._id}

className="

bg-white

rounded-3xl

shadow-lg

p-5

hover:shadow-2xl

transition

"



>



<img

src={`http://localhost:8000${product.image}`}

className="

w-full

h-52

object-cover

rounded-2xl

"

/>





<h3 className="

text-xl

font-bold

mt-5

">

{product.name}

</h3>



<p className="

text-indigo-600

font-bold

mt-2

">

₹ {product.price}

</p>



<p>

Stock: {product.stock}

</p>





<div className="

flex

gap-3

mt-6

">


<button

onClick={()=>openEdit(product)}

className="

flex-1

bg-blue-600

text-white

py-3

rounded-xl

flex

justify-center

items-center

gap-2

"

>

<FaEdit/>

Edit

</button>





<button

onClick={()=>deleteHandler(product._id)}

className="

flex-1

bg-red-500

text-white

py-3

rounded-xl

flex

justify-center

items-center

gap-2

"

>

<FaTrash/>

Delete

</button>



</div>



</div>


))


}



</div>









{/* EDIT MODAL */}



{

editProduct &&


<div className="

fixed

inset-0

bg-black/60

backdrop-blur-sm

flex

items-center

justify-center

z-50

px-5

">


<div className="

bg-white

rounded-3xl

p-8

w-full

max-w-xl

shadow-2xl

">



<div className="

flex

justify-between

items-center

mb-6

">


<h2 className="text-2xl font-bold">

Edit Product

</h2>


<button

onClick={()=>setEditProduct(null)}

>

<FaTimes/>

</button>


</div>





{

Object.keys(editForm).map(key=>(


<Input

key={key}

label={key}

name={key}

value={editForm[key]}

onChange={(e)=>

setEditForm({

...editForm,

[key]:e.target.value

})

}

/>


))


}





<button

onClick={editHandler}

className="

w-full

mt-5

bg-green-600

text-white

py-3

rounded-xl

font-bold

flex

justify-center

gap-3

"

>

<FaEdit/>

Save Changes


</button>



</div>



</div>


}



</div>


</div>


);


}



export default AdminDashboard;