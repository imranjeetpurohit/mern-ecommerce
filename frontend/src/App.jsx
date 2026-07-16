import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminOrders from "./pages/AdminOrders";
import Wishlist from "./pages/Wishlist";



function App() {


return (

<BrowserRouter>


<div className="
min-h-screen
bg-gradient-to-br
from-slate-100
via-blue-50
to-indigo-100
">


<Navbar />



<Routes>


<Route path="/" element={<Home />} />


<Route path="/login" element={<Login />} />


<Route path="/register" element={<Register />} />



<Route
path="/profile"
element={
<PrivateRoute>
<Profile />
</PrivateRoute>
}
/>



<Route
path="/product/:id"
element={<ProductDetails />}
/>



<Route
path="/cart"
element={<Cart />}
/>



<Route
path="/checkout"
element={<Checkout />}
/>



<Route
path="/orders"
element={
<PrivateRoute>
<Orders />
</PrivateRoute>
}
/>



<Route
path="/admin"
element={
<AdminRoute>
<AdminDashboard />
</AdminRoute>
}
/>



<Route
path="/admin/orders"
element={
<AdminRoute>
<AdminOrders />
</AdminRoute>
}
/>



<Route
path="/wishlist"
element={<Wishlist />}
/>



</Routes>


</div>


</BrowserRouter>

);


}


export default App;