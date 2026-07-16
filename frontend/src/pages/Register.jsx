import {useState} from "react";
import {registerUser} from "../services/authService";
import {useNavigate} from "react-router-dom";


function Register(){


const navigate = useNavigate();



const [form,setForm]=useState({

name:"",
email:"",
password:""

});



const [error,setError]=useState("");

const [loading,setLoading]=useState(false);





const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};






const submit=async(e)=>{


e.preventDefault();


setError("");



if(!form.name || !form.email || !form.password){


setError("Please fill all fields");


return;


}




try{


setLoading(true);


await registerUser(form);


navigate("/login");


}
catch(err){


setError(

err.response?.data?.message ||

"Registration failed"

);


}
finally{


setLoading(false);


}


};







return (



<div className="
min-h-screen
flex
items-center
justify-center
relative
overflow-hidden
bg-gradient-to-br
from-slate-950
via-purple-900
to-pink-700
px-5
">






{/* Background Effects */}


<div className="
absolute
top-0
left-0
w-80
h-80
bg-purple-500
rounded-full
blur-3xl
opacity-40
">
</div>



<div className="
absolute
bottom-0
right-0
w-96
h-96
bg-pink-500
rounded-full
blur-3xl
opacity-40
">
</div>







{/* Register Card */}



<div className="
relative
w-full
max-w-md
bg-white
rounded-3xl
shadow-2xl
overflow-hidden
">








{/* Header */}


<div className="
h-44
bg-gradient-to-r
from-indigo-600
via-purple-600
to-pink-500
flex
flex-col
items-center
justify-center
text-white
">



<div className="
w-20
h-20
rounded-full
bg-white/20
flex
items-center
justify-center
mb-4
text-4xl
font-bold
">

🛍️

</div>



<h1 className="
text-4xl
font-extrabold
">

Register

</h1>



<p className="
text-white/80
mt-2
">

Create your account

</p>



</div>









{/* Form */}



<form

onSubmit={submit}

className="
p-10
"

>







{
error &&

<div className="
bg-red-100
text-red-600
rounded-xl
p-3
mb-6
text-center
font-medium
">

{error}

</div>

}







<div className="
space-y-5
">







<div>

<label className="
block
text-gray-700
font-semibold
mb-2
">

Full Name

</label>


<input

name="name"

placeholder="Enter your name"

value={form.name}

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
focus:ring-purple-200
transition
"

/>


</div>









<div>

<label className="
block
text-gray-700
font-semibold
mb-2
">

Email Address

</label>



<input

name="email"

type="email"

placeholder="Enter your email"

value={form.email}

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
focus:ring-purple-200
transition
"

/>


</div>









<div>

<label className="
block
text-gray-700
font-semibold
mb-2
">

Password

</label>



<input

name="password"

type="password"

placeholder="Create password"

value={form.password}

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
focus:ring-purple-200
transition
"

/>


</div>









<button

disabled={loading}

className="
w-full
h-14
rounded-2xl
bg-gradient-to-r
from-indigo-600
to-pink-500
text-white
font-bold
text-lg
shadow-xl
hover:scale-105
transition
duration-300
"

>


{

loading

?

"Creating Account..."

:

"Register"

}


</button>






</div>








<p className="
text-center
mt-8
text-gray-600
">


Already have an account?


<span

onClick={()=>navigate("/login")}

className="
text-purple-600
font-bold
cursor-pointer
ml-2
hover:underline
"

>

Login

</span>


</p>







</form>







</div>







</div>


);


}


export default Register;