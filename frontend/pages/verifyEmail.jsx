import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const VerifyEmail = () => {
    const { token } = useParams()
    const [status, setStatus] = useState("verifying...")
    const navigate = useNavigate()

    const verifyEmail = async () => {
        if (!token) {
            setStatus("Invalid verification token")
            return
        }

        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/user/verify",
                { token },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (res.data.success) {
                setStatus('Email verified successfully! Redirecting to login...')
                setTimeout(() => {
                    navigate('/login')
                }, 1500)
                return
            }

            setStatus(res.data.message || "Verification failed. Please try again.")
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Verification failed. Please try again."
            setStatus(message)
        }
    }

    useEffect(() => {
        if (token) verifyEmail()
    }, [token]);
    return (
        <div className='relative w-full h-[760px] overflow-hidden bg-pink-100'>
            <div className='min-h-screen flex items-center justify-center'>
                <div className='bg-white p-6 rounded-2xl shadow-md text-center w-[90%] sm:w-[400px]'>
                    <h2 className='text-xl font-bold text-gray-800'>{status}</h2>
                </div>
            </div>
        </div>
    )
}
 
export default VerifyEmail