import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart') || '[]')
        setCartItems(items)
    }, [])

    const handleRemoveItem = (indexToRemove) => {
        const newCart = cartItems.filter((_, index) => index !== indexToRemove)
        setCartItems(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
        window.dispatchEvent(new Event('cartUpdated'))
        toast.success('Item removed from cart')
    }

    const handleCheckout = () => {
        toast.success("Fake Checkout Complete! Thank you!")
        setCartItems([])
        localStorage.removeItem('cart')
        window.dispatchEvent(new Event('cartUpdated'))
    }

    const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0)

    return (
        <div className='pt-36 md:pt-28 min-h-screen bg-gray-50 pb-16 px-4'>
            <div className='max-w-4xl mx-auto'>
                <div className='flex items-center gap-4 mb-8'>
                    <Link to="/products" className='p-2 hover:bg-gray-200 rounded-full transition-colors'>
                        <ArrowLeft size={24} className='text-gray-600' />
                    </Link>
                    <h1 className='text-3xl font-bold text-gray-900'>Your Cart</h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className='bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100'>
                        <img src="/ekart.jpg" alt="Empty Cart" className='mx-auto w-32 h-32 object-cover opacity-50 mb-6 rounded-full' onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Empty' }} />
                        <h2 className='text-2xl font-semibold text-gray-700 mb-2'>Your cart is empty</h2>
                        <p className='text-gray-500 mb-6'>Looks like you haven't added anything yet.</p>
                        <Link to='/products' className='bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium'>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='md:col-span-2 flex flex-col gap-4'>
                            {cartItems.map((item, index) => (
                                <div key={`${item._id}-${index}`} className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center'>
                                    <div className='w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0'>
                                        <img src={item.image} alt={item.name} className='w-full h-full object-cover' onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image' }} />
                                    </div>
                                    <div className='flex-grow'>
                                        <h3 className='font-bold text-lg text-gray-900 line-clamp-1'>{item.name}</h3>
                                        <p className='text-sm text-gray-500 mb-1'>{item.category}</p>
                                        <p className='font-semibold text-pink-600'>${item.price}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleRemoveItem(index)}
                                        className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0'
                                        title='Remove Item'
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        {/* Order Summary */}
                        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-32'>
                            <h3 className='text-xl font-bold text-gray-900 mb-4'>Order Summary</h3>
                            <div className='flex justify-between items-center mb-2'>
                                <span className='text-gray-600'>Subtotal ({cartItems.length} items)</span>
                                <span className='font-semibold'>${total.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between items-center mb-4'>
                                <span className='text-gray-600'>Shipping</span>
                                <span className='font-semibold text-green-600'>Free</span>
                            </div>
                            <div className='border-t border-gray-100 pt-4 mb-6 flex justify-between items-center'>
                                <span className='font-bold text-lg'>Total</span>
                                <span className='font-bold text-2xl text-pink-600'>${total.toFixed(2)}</span>
                            </div>
                            <button 
                                onClick={handleCheckout}
                                className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg'
                            >
                                Checkout Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
