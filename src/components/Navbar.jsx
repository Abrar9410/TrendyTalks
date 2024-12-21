import { Link, NavLink, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
import emptyUser from "../assets/user.png";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut();
    }

    return (
        <div className="w-11/12 mx-auto my-6 px-2 py-1 md:py-2 rounded-lg bg-[#575757]">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn-ghost md:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
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
                            <li><NavLink to="/brands">Brands</NavLink></li>
                            <li><NavLink to="/about-dev">About Dev</NavLink></li>
                            {user && <li><NavLink to="/user-profile">My Profile</NavLink></li>}
                        </ul>
                    </div>
                    <Link to="/" className="flex max-[305px]:flex-col max-[305px]:gap-0 items-center gap-2">
                        {/* <img className="w-4 sm:w-6 md:w-8" src={logo} alt="logo" /> */}
                        <p className="sm:text-lg md:text-xl font-semibold text-white">TrendyTalks</p>
                    </Link>
                </div>
                {
                    location.pathname === "/login" || location.pathname === "/register" ?
                        <div className="w-max bg-white rounded-full"><img src={emptyUser} alt="empty_user" /></div> :
                        <div className="hidden md:flex justify-center items-center gap-4 text-white">
                            <NavLink to="/" className={({isActive})=>isActive? "underline": "hover:scale-105"}>Home</NavLink>
                            <NavLink to="/brands" className={({isActive})=>isActive? "underline": "hover:scale-105"}>Brands</NavLink>
                            <NavLink to="/about-dev" className={({isActive})=>isActive? "underline": "hover:scale-105"}>About Dev</NavLink>
                            {user && <NavLink to="/user-profile" className={({ isActive }) => isActive ? "underline" : "hover:scale-105"}>My Profile</NavLink>}
                        </div>
                }
                {
                    location.pathname === "/login" || location.pathname === "/register" ||
                    <div className="flex flex-col justify-end items-end gap-1">
                            <div className="flex max-[270px]:flex-col justify-end items-center max-[290px]:gap-1 gap-2">
                                {user && <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border"><img className="w-full h-full rounded-full" src={user.photoURL} alt="user_IMG" /></div>}
                                {
                                    user ?
                                        <button onClick={handleLogOut} className="outline-none max-[350px]:p-1 px-3 py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold bg-white text-[#575757] hover:scale-105 shadow-md">Log Out</button>
                                        : <button onClick={() => navigate("/login")} className="outline-none max-[350px]:p-1 px-3 py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold bg-white text-[#575757] hover:scale-105 shadow-md">Log In</button>
                                }
                                {!user && <button onClick={() => navigate("/register")} className="outline-none max-[350px]:p-1 px-3 py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold bg-white text-[#575757] hover:scale-105 shadow-md">Register</button>}
                            </div>
                            {user && <p className="text-xs text-white">{user.email}</p>}
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;