import {useState,useContext} from "react";
import {loginUser} from "../services/authService";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {FaShoppingBag} from "react-icons/fa";


function Login(){


const navigate = useNavigate();

const {login}=useContext(AuthContext);



const [form,setForm]=useState({

email:"",
password:""

});


const [error,setError]=useState("");

const [loading,setLoading]=useState(false);




const submit=async(e)=>{


e.preventDefault();


setError("");



if(!form.email || !form.password){

setError("Please fill all fields");

return;

}



try{


setLoading(true);


const data = await loginUser(form);



login(
data.user,
data.token
);



navigate("/");


}
catch(err){


setError(
err.response?.data?.message ||
"Login failed"
);


}
finally{


setLoading(false);


}


};





return (


<div className="
min-h-[calc(100vh-80px)]
flex
items-center
justify-center
bg-gradient-to-br
from-indigo-900
via-purple-700
to-pink-600
relative
overflow-hidden
">



<div className="
absolute
w-72
h-72
bg-pink-400
rounded-full
blur-3xl
opacity-30
top-10
left-10
">
</div>



<div className="
absolute
w-80
h-80
bg-blue-400
rounded-full
blur-3xl
opacity-30
bottom-10
right-10
">
</div>





<form

onSubmit={submit}

className="
relative
w-full
max-w-md
bg-white/20
backdrop-blur-xl
border
border-white/30
rounded-3xl
shadow-2xl
p-10
"

>





<div className="
flex
justify-center
mb-6
">


<div className="
w-20
h-20
rounded-full
bg-gradient-to-r
from-yellow-300
to-pink-500
flex
items-center
justify-center
shadow-lg
">


<FaShoppingBag

className="
text-white
text-4xl
"

/>


</div>


</div>





<h1 className="
text-4xl
font-bold
text-white
text-center
mb-3
">

Welcome Back

</h1>



<p className="
text-white/80
text-center
mb-8
">

Login to your account

</p>







{
error &&

<p className="
bg-red-500/30
text-white
rounded-xl
p-3
mb-5
text-center
">

{error}

</p>

}






<div className="
space-y-5
">





<input

type="email"

placeholder="Email Address"

value={form.email}

onChange={(e)=>

setForm({

...form,

email:e.target.value

})

}

className="
w-full
h-14
rounded-2xl
px-6
bg-white
text-gray-800
outline-none
shadow-lg
focus:ring-4
focus:ring-pink-300
"

/>







<input

type="password"

placeholder="Password"

value={form.password}

onChange={(e)=>

setForm({

...form,

password:e.target.value

})

}

className="
w-full
h-14
rounded-2xl
px-6
bg-white
text-gray-800
outline-none
shadow-lg
focus:ring-4
focus:ring-purple-300
"

/>








<button

disabled={loading}

className="
w-full
h-14
rounded-2xl
bg-gradient-to-r
from-pink-500
via-purple-500
to-indigo-500
text-white
font-bold
text-lg
shadow-xl
hover:scale-105
transition
"

>

{

loading
?
"Logging in..."
:
"Login"

}


</button>




</div>







<p className="
text-center
text-white
mt-8
">

Don't have an account?


<span

onClick={()=>navigate("/register")}

className="
ml-2
text-yellow-300
font-bold
cursor-pointer
hover:underline
"

>

Register

</span>


</p>





</form>



</div>


);


}


export default Login;