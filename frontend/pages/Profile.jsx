import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const userName = localStorage.getItem('userName') || 'User'
    const userEmail = localStorage.getItem('userEmail') || '' // Assuming we store email, but if not we might need to fetch it or pass it nicely. Let's add a form anyway.
    
    // For simplicity, if email isn't in localStorage, let's ask for it in the form or decode the token.
    // Actually, the API requires the email in the URL params: `/change-password/:email`
    // Let's allow them to input their email alongside the new passwords for security, or we decode. 
    // Let's just add an email field to the form to be safe.
    
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        
        try {
            setLoading(true)
            const res = await axios.post(`http://localhost:8000/api/v1/user/change-password/${formData.email}`, {
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            })
            
            if (res.data.success) {
                toast.success(res.data.message)
                setIsEditingPassword(false)
                setFormData({ email: "", newPassword: "", confirmPassword: "" })
                
                // Optionally log them out to force login with new password
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('userName')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to change password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='pt-36 md:pt-28 min-h-screen bg-gray-50 flex justify-center items-start px-4'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mb-10'>
                <h1 className='text-3xl font-bold mb-6'>User Profile</h1>
                
                {/* Profile Header */}
                <div className='flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 text-center md:text-left'>
                    <div className='w-24 h-24 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-4xl font-bold shrink-0'>
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className='mt-2'>
                        <h2 className='text-2xl font-semibold'>{userName}</h2>
                        <p className='text-gray-500'>Welcome to your profile dashboard.</p>
                    </div>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Orders Card */}
                    <div className='p-6 bg-pink-50 rounded-lg border border-pink-100'>
                        <h3 className='font-semibold text-lg mb-2 text-pink-800'>My Orders</h3>
                        <p className='text-gray-600 mb-4 text-sm'>View and track your previous orders.</p>
                        <button className='text-pink-600 font-medium hover:underline text-sm'>View Orders &rarr;</button>
                    </div>
                    
                    {/* Settings Card */}
                    <div className='p-6 bg-blue-50 rounded-lg border border-blue-100'>
                        <h3 className='font-semibold text-lg mb-2 text-blue-800'>Account Settings</h3>
                        <p className='text-gray-600 mb-4 text-sm'>Update your password and personal details.</p>
                        <button 
                            onClick={() => setIsEditingPassword(!isEditingPassword)}
                            className='text-blue-600 font-medium hover:underline text-sm'
                        >
                            {isEditingPassword ? "Cancel Edit" : "Change Password &rarr;"}
                        </button>
                    </div>
                </div>

                {/* Change Password Form */}
                {isEditingPassword && (
                    <div className='mt-8 p-6 border rounded-lg bg-white shadow-sm'>
                        <h3 className='text-xl font-semibold mb-4'>Change Password</h3>
                        <form onSubmit={handleChangePassword} className='flex flex-col gap-4 max-w-md'>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Confirm Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="grid gap-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-2">
                                {loading ? <Loader2 className='animate-spin' size={20} /> : "Update Password"}
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
