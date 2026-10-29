import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import SearchBar from './SearchBar';

function Navbar() {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartItems, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate("/login");
        localStorage.removeItem('token');
        setToken("");
        setCartItems({});
    }

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            {/* Logo */}
            <Link to='/'>  {/* Use Link component here */}
                {/* <img src={assets.logo} className="w-36" alt="Logo" /> */}
                <h2 style={{ fontSize: '30px' }}>ThreadCart</h2>
            </Link>

            {/* Navigation Links */}
            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                {["Home", "Collection", "About", "Contact"].map((item, index) => (
                    <NavLink
                        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                        key={index}
                        className="flex flex-col items-center gap-1"
                    >
                        <p>{item}</p>
                        <hr className="w-full border-none h-[1.5px] bg-gray-700 hidden group-hover:block" />
                    </NavLink>
                ))}
            </ul>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
                <Link to="/collection">
                    <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="Search" />
                </Link>

                {/* Profile Dropdown */}

                <div className="group relative"> <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className="w-5 cursor-pointer" alt="Profile" />

                    {token && (
                        <div className="absolute right-0 top-full z-50 hidden pt-3 group-hover:block">
                            <div className="flex flex-col gap-3 w-40 rounded-md border border-gray-100 bg-white py-4 px-5 text-sm text-gray-600 shadow-xl">
                                <p
                                    onClick={() => navigate('/profile')}
                                    className="cursor-pointer hover:text-black"
                                >
                                    My Profile
                                </p>

                                <p
                                    onClick={() => navigate('/orders')}
                                    className="cursor-pointer transition-colors hover:text-black"
                                >
                                    Orders
                                </p>

                                <p
                                    onClick={logout}
                                    className="cursor-pointer transition-colors hover:text-black"
                                >
                                    Logout
                                </p>
                            </div>
                        </div>
                    )}

                </div>

                {/* Cart Icon */}
                <Link to="/cart" className="relative">
                    <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                        {getCartItems()}

                    </p>
                </Link>

                {/* Mobile Menu Icon */}
                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className="w-5 cursor-pointer sm:hidden"
                    alt="Menu"
                />
            </div>

            {/* Mobile Menu (Sliding Drawer) */}
            <div
                className={`absolute top-0 right-0 h-screen bg-white transition-all duration-300 ${visible ? 'w-64' : 'w-0'
                    } overflow-hidden shadow-lg sm:hidden`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-4 right-4 text-gray-700"
                >
                    ✕
                </button>

                {/* Mobile Navigation Links */}
                <ul className="flex flex-col gap-5 mt-16 px-6 text-gray-700">
                    {["Home", "Collection", "About", "Contact"].map((item, index) => (
                        <NavLink
                            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            key={index}
                            className="flex flex-col items-center gap-1"
                        >
                            <p>{item}</p>
                            <hr className="w-1/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block" />
                        </NavLink>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
