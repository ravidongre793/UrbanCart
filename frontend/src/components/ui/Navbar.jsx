import { ShoppingCart, User, LogOut, LogIn } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

const Navbar = () => {
    const [user, setUser] = useState(localStorage.getItem('accessToken'))
    const navigate = useNavigate()

    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        // Initial load
        const updateCartCount = () => {
            const items = JSON.parse(localStorage.getItem('cart') || '[]')
            setCartCount(items.length)
        }
        updateCartCount()

        // Listen for updates from other files
        window.addEventListener('cartUpdated', updateCartCount)
        return () => window.removeEventListener('cartUpdated', updateCartCount)
    }, [])

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8000/api/v1/user/logout", {}, {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            })
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('userName')
            localStorage.removeItem('userRole')
            setUser(null)
            toast.success("Logged out successfully")
            navigate('/login')
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Logout failed")
        }
    }

    return (
        <header className='bg-white/80 backdrop-blur-md fixed w-full z-20 border-b border-pink-200 shadow-sm'>
            <div className='max-w-7xl mx-auto flex flex-wrap justify-between items-center py-3 px-4 md:px-6 gap-y-4'>
                {/* logo section */}
                <Link to={'/'} className='flex items-center gap-2shrink-0'>
                    <img src="/ekart.jpg" alt="Ekart Logo" className='w-[80px] md:w-[90px] rounded-md' />
                </Link>

                {/* nav section */}
                <nav className='flex gap-4 md:gap-8 items-center overflow-x-auto pb-1 md:pb-0 hide-scrollbar'>
                    <ul className='flex gap-2 md:gap-6 items-center text-sm md:text-base font-medium text-gray-700 whitespace-nowrap'>
                        <li>
                            <NavLink
                                to={'/'}
                                className={({ isActive }) =>
                                    `px-3 py-1.5 rounded-md transition-all duration-200 ${isActive
                                        ? 'bg-pink-100 text-pink-600 font-semibold'
                                        : 'hover:bg-pink-50 hover:text-pink-500'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/products'}
                                className={({ isActive }) =>
                                    `px-3 py-1.5 rounded-md transition-all duration-200 ${isActive
                                        ? 'bg-pink-100 text-pink-600 font-semibold'
                                        : 'hover:bg-pink-50 hover:text-pink-500'
                                    }`
                                }
                            >
                                Products
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink
                                    to={'/profile'}
                                    className={({ isActive }) =>
                                        `flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-200 ${isActive
                                            ? 'bg-pink-100 text-pink-600 font-semibold'
                                            : 'hover:bg-pink-50 hover:text-pink-500'
                                        }`
                                    }
                                >
                                    <User size={16} />
                                    Hello {localStorage.getItem('userName') || 'User'}
                                </NavLink>
                            </li>
                        )}
                        {user && localStorage.getItem('userRole') === 'admin' && (
                            <li>
                                <NavLink
                                    to={'/admin/add-product'}
                                    className={({ isActive }) =>
                                        `px-3 py-1.5 rounded-md transition-all duration-200 ${isActive
                                            ? 'bg-pink-100 text-pink-600 font-semibold'
                                            : 'hover:bg-pink-50 hover:text-pink-500'
                                        }`
                                    }
                                >
                                    Add Product
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    {/* cart icon */}
                    <Link to={'/cart'} className='relative p-2 rounded-full hover:bg-pink-50 transition-colors duration-200'>
                        <ShoppingCart size={22} className='text-gray-700' />
                        {cartCount > 0 && (
                            <span className='bg-pink-500 text-white text-xs font-bold rounded-full absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center'>
                                {cartCount > 9 ? '9+' : cartCount}
                            </span>
                        )}
                    </Link>

                    {/* login/logout button */}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className='flex items-center gap-1.5 px-4 py-1.5 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200 cursor-pointer font-medium text-sm'
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    ) : (
                        <Link
                            to={'/login'}
                            className='flex items-center gap-1.5 px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium text-sm'
                        >
                            <LogIn size={16} />
                            Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar