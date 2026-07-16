import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import {
    FaShoppingBag,
    FaHome,
    FaUser,
    FaShoppingCart,
    FaHeart,
    FaSignOutAlt,
    FaTachometerAlt,
    FaClipboardList,
    FaSignInAlt,
    FaUserPlus
} from "react-icons/fa";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    const navLink = `
        flex
        items-center
        gap-2
        text-gray-300
        hover:text-white
        transition
        duration-300
        font-medium
    `;

    return (

        <nav className="
            sticky
            top-0
            z-50
            bg-slate-900/90
            backdrop-blur-xl
            border-b
            border-white/10
            shadow-lg
        ">

            <div className="
                max-w-7xl
                mx-auto
                px-6
                py-4
                flex
                items-center
                justify-between
                flex-wrap
                gap-6
            ">

                {/* Logo + Welcome */}

                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="flex items-center gap-4"
                    >

                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-gradient-to-r
                            from-indigo-600
                            to-purple-600
                            flex
                            items-center
                            justify-center
                            shadow-lg
                        ">
                            <FaShoppingBag className="text-white text-2xl" />
                        </div>

                        <div>

                            <h1 className="
                                text-3xl
                                font-extrabold
                                tracking-wide
                                bg-gradient-to-r
                                from-indigo-400
                                to-pink-400
                                bg-clip-text
                                text-transparent
                            ">
                                MERN Shop
                            </h1>

                            <p className="text-xs text-gray-400">
                                Premium E-Commerce
                            </p>

                        </div>

                    </Link>

                    {user && (

                        <div className="
                            hidden
                            md:flex
                            flex-col
                            border-l
                            border-gray-700
                            pl-5
                        ">

                            <span className="text-sm text-gray-400">
                                Welcome Back
                            </span>

                            <span className="
                                text-lg
                                font-semibold
                                text-white
                            ">
                                👋 Hello, {user.name}
                            </span>

                        </div>

                    )}

                </div>

                {/* Navigation */}

                <div className="
                    flex
                    items-center
                    gap-4
                    flex-wrap
                ">

                    <Link
                        to="/"
                        className={navLink}
                    >
                        <FaHome />
                        Home
                    </Link>

                    {user ? (

                        <>

                            <Link
                                to="/profile"
                                className={navLink}
                            >
                                <FaUser />
                                Profile
                            </Link>

                            <Link
                                to="/orders"
                                className={navLink}
                            >
                                <FaClipboardList />
                                Orders
                            </Link>

                            <Link
                                to="/cart"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-indigo-600
                                    hover:bg-indigo-700
                                    px-4
                                    py-2
                                    rounded-xl
                                    text-white
                                    font-semibold
                                    transition
                                    shadow-md
                                "
                            >
                                <FaShoppingCart />
                                Cart
                            </Link>

                            <Link
                                to="/wishlist"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-pink-600
                                    hover:bg-pink-700
                                    px-4
                                    py-2
                                    rounded-xl
                                    text-white
                                    font-semibold
                                    transition
                                    shadow-md
                                "
                            >
                                <FaHeart />
                                Wishlist
                            </Link>

                            {user.isAdmin && (

                                <>

                                    <Link
                                        to="/admin"
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            bg-purple-600
                                            hover:bg-purple-700
                                            px-4
                                            py-2
                                            rounded-xl
                                            text-white
                                            font-semibold
                                            transition
                                            shadow-md
                                        "
                                    >
                                        <FaTachometerAlt />
                                        Dashboard
                                    </Link>

                                    <Link
                                        to="/admin/orders"
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            bg-blue-600
                                            hover:bg-blue-700
                                            px-4
                                            py-2
                                            rounded-xl
                                            text-white
                                            font-semibold
                                            transition
                                            shadow-md
                                        "
                                    >
                                        <FaClipboardList />
                                        Admin Orders
                                    </Link>

                                </>

                            )}

                            <button
                                onClick={logout}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-red-600
                                    hover:bg-red-700
                                    px-4
                                    py-2
                                    rounded-xl
                                    text-white
                                    font-semibold
                                    transition
                                    shadow-md
                                "
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            <Link
                                to="/login"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-green-600
                                    hover:bg-green-700
                                    px-5
                                    py-2
                                    rounded-xl
                                    text-white
                                    font-semibold
                                    transition
                                    shadow-md
                                "
                            >
                                <FaSignInAlt />
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-indigo-600
                                    hover:bg-indigo-700
                                    px-5
                                    py-2
                                    rounded-xl
                                    text-white
                                    font-semibold
                                    transition
                                    shadow-md
                                "
                            >
                                <FaUserPlus />
                                Register
                            </Link>

                        </>

                    )}

                </div>

            </div>

        </nav>

    );

}

export default Navbar;