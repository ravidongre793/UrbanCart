import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'

const AddProduct = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: ""
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const submitHandle = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const token = localStorage.getItem('accessToken')
            const res = await axios.post("http://localhost:8000/api/v1/product/add", formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/products')
            }
        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message || "Failed to add product")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='pt-36 md:pt-28 min-h-screen bg-gray-50 flex justify-center items-start px-4'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mb-10'>
                <h1 className='text-3xl font-bold mb-2'>Add New Product</h1>
                <p className='text-gray-500 mb-8'>Fill out the details below to add a product to the catalog.</p>

                <form onSubmit={submitHandle} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="e.g. iPhone 15 Pro"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                type="text"
                                placeholder="e.g. Smartphones"
                                required
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            placeholder="Enter product description..."
                            required
                            className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                step="any"
                                placeholder="999.99"
                                required
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image">Image URL (Optional)</Label>
                            <Input
                                id="image"
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 mt-4 h-12 text-lg">
                        {loading ? <Loader2 className='animate-spin' size={24} /> : "Add Product"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
