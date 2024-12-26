import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import emptyUser from "../assets/user.png";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut();
            }
        });
    }

    return (
        <div className="bg-black sticky top-0 z-10">
            <div className="w-11/12 mx-auto py-3 sm:py-4 lg:py-5 xl:py-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn-ghost md:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="white">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/blogs">All Blogs</NavLink></li>
                                <li><NavLink to="/featured">Featured</NavLink></li>
                                <li><NavLink to="/add-blog">Add Blog</NavLink></li>
                                {user && <li><NavLink to="/wishlist">WishList</NavLink></li>}
                            </ul>
                        </div>
                        <Link to="/" className="flex max-[240px]:flex-col max-[240px]:gap-0 items-center gap-1 sm:gap-2 md:gap-3">
                            <img className="w-6 sm:w-8 md:w-10 rounded-md" src={logo} alt="logo" />
                            <p className="sm:text-lg md:text-xl lg:text-2xl text-blue-600 font-bold">TrendyTalks</p>
                        </Link>
                    </div>
                    {
                        location.pathname === "/login" || location.pathname === "/register" ?
                            <div className="w-max bg-white rounded-full"><img src={emptyUser} alt="empty_user" /></div> :
                            <div className="hidden md:flex justify-center items-center gap-4">
                                <NavLink to="/" className={({ isActive }) => isActive ? "text-cyan-400 underline font-semibold" : "text-white hover:scale-105"}>Home</NavLink>
                                <NavLink to="/blogs" className={({ isActive }) => isActive ? "text-cyan-400 underline font-semibold" : "text-white hover:scale-105"}>All Blogs</NavLink>
                                <NavLink to="/featured" className={({ isActive }) => isActive ? "text-cyan-400 underline font-semibold" : "text-white hover:scale-105"}>Featured</NavLink>
                                <NavLink to="/add-blog" className={({ isActive }) => isActive ? "text-cyan-400 underline font-semibold" : "text-white hover:scale-105"}>Add Blog</NavLink>
                                {user && <NavLink to="/wishlist" className={({ isActive }) => isActive ? "text-cyan-400 underline font-semibold" : "text-white hover:scale-105"}>WishList</NavLink>}
                            </div>
                    }
                    {
                        location.pathname === "/login" || location.pathname === "/register" ||
                        <div className="flex max-[300px]:flex-col justify-end items-center max-[290px]:gap-1 gap-2">
                            {user && <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border"><img className="w-full h-full rounded-full" src={user.photoURL} alt="user_IMG" /></div>}
                            {
                                user ?
                                    <button onClick={handleLogOut} className="outline-none max-[350px]:p-1 px-3 py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold bg-red-500 text-black hover:scale-105 shadow-md">Log Out</button>
                                    : <button onClick={() => navigate("/login")} className="outline-none max-[350px]:p-1 px-3 py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold bg-cyan-500 text-black hover:scale-105 shadow-md">Log In</button>
                            }
                            {!user && <button onClick={() => navigate("/register")} className="outline-none max-[350px]:p-1 px-3 py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold bg-cyan-500 text-black hover:scale-105 shadow-md">Register</button>}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;