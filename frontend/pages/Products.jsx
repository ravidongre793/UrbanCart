import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ShoppingCart, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/product/all")
                if (res.data.success) {
                    setProducts(res.data.products)
                }
            } catch (error) {
                console.error("Failed to fetch products:", error)
                toast.error("Failed to load products")
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))
        window.dispatchEvent(new Event('cartUpdated'))
        toast.success(`Added ${product.name} to cart!`)
    }

    return (
        <div className='pt-36 md:pt-28 min-h-screen bg-gray-50 pb-16'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='flex flex-wrap gap-4 justify-between items-center mb-10'>
                    <h1 className='text-3xl font-bold text-gray-900'>Our Products</h1>
                    {/* Admins get a direct link here too, though Navbar has one */}
                    {localStorage.getItem('userRole') === 'admin' && (
                        <Link 
                            to="/admin/add-product" 
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm shrink-0"
                        >
                            + Add New Product
                        </Link>
                    )}
                </div>

                {loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <Loader2 className='animate-spin text-pink-500' size={48} />
                    </div>
                ) : products.length === 0 ? (
                    <div className='text-center py-20 bg-white rounded-lg shadow-sm'>
                        <h2 className='text-2xl font-semibold text-gray-600 mb-2'>No products found</h2>
                        <p className='text-gray-500'>Check back later for new arrivals!</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                        {products.map((product) => (
                            <div key={product._id} className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col'>
                                <div className='aspect-square overflow-hidden bg-gray-100 relative'>
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image' }}
                                    />
                                    <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700'>
                                        {product.category}
                                    </div>
                                </div>
                                
                                <div className='p-5 flex flex-col flex-grow'>
                                    <h3 className='font-bold text-lg text-gray-900 mb-1 line-clamp-1'>{product.name}</h3>
                                    <p className='text-gray-500 text-sm mb-4 line-clamp-2 flex-grow'>
                                        {product.description}
                                    </p>
                                    
                                    <div className='flex items-center justify-between mt-auto'>
                                        <span className='font-bold text-xl text-gray-900'>${product.price}</span>
                                        <button 
                                            onClick={() => handleAddToCart(product)}
                                            className='w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors'
                                            title='Add to Cart'
                                        >
                                            <ShoppingCart size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products
