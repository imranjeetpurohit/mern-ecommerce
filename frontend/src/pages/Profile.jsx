import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import {
    FaUser,
    FaEnvelope,
    FaShoppingBag
} from "react-icons/fa";



function Profile(){


const {user}=useContext(AuthContext);




if(!user){

return (

<div className="
min-h-screen
flex
items-center
justify-center
text-xl
font-bold
text-gray-600
">

Loading profile...

</div>

);

}







return (



<div className="

min-h-screen

flex

items-center

justify-center

py-10

px-5

">





<div className="

w-full

max-w-xl

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

w-24

h-24

rounded-full

bg-white/20

flex

items-center

justify-center

shadow-lg

mb-4

">


<FaUser

className="

text-5xl

"

/>


</div>





<h1 className="

text-3xl

font-bold

">

My Profile

</h1>



</div>









{/* Profile Details */}



<div className="

p-8

space-y-6

">






<div className="

flex

items-center

gap-5

bg-gray-50

rounded-2xl

p-5

">



<div className="

w-12

h-12

rounded-full

bg-indigo-100

flex

items-center

justify-center

text-indigo-600

">


<FaUser/>

</div>





<div>

<p className="

text-sm

text-gray-500

">

Full Name

</p>



<h2 className="

text-lg

font-bold

text-gray-800

">

{user.name}

</h2>


</div>




</div>









<div className="

flex

items-center

gap-5

bg-gray-50

rounded-2xl

p-5

">



<div className="

w-12

h-12

rounded-full

bg-pink-100

flex

items-center

justify-center

text-pink-600

">


<FaEnvelope/>

</div>





<div>

<p className="

text-sm

text-gray-500

">

Email Address

</p>



<h2 className="

text-lg

font-bold

text-gray-800

break-all

">

{user.email}

</h2>


</div>




</div>









<div className="

flex

items-center

gap-5

bg-gray-50

rounded-2xl

p-5

">



<div className="

w-12

h-12

rounded-full

bg-green-100

flex

items-center

justify-center

text-green-600

">


<FaShoppingBag/>

</div>





<div>

<p className="

text-sm

text-gray-500

">

Account Type

</p>



<h2 className="

text-lg

font-bold

text-gray-800

">

{

user.isAdmin

?

"Administrator"

:

"Customer"

}

</h2>


</div>




</div>








</div>






</div>





</div>


);


}


export default Profile;