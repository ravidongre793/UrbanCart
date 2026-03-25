import React from 'react'
import { Truck, ShieldCheck, Headset } from 'lucide-react'

const Features = () => {
    return (
        <section className='py-20 bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-12'>Why Choose Ekart?</h2>
                <div className='grid md:grid-cols-3 gap-8'>
                    <div className='text-center'>
                        <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <Truck size={32} className='text-blue-600' />
                        </div>
                        <h3 className='text-xl font-semibold mb-2'>Fast Delivery</h3>
                        <p className='text-gray-600'>Get your products delivered to your doorstep in record time.</p>
                    </div>
                    <div className='text-center'>
                        <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <ShieldCheck size={32} className='text-purple-600' />
                        </div>
                        <h3 className='text-xl font-semibold mb-2'>Secure Payments</h3>
                        <p className='text-gray-600'>All transactions are encrypted and secure.</p>
                    </div>
                    <div className='text-center'>
                        <div className='w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <Headset size={32} className='text-pink-600' />
                        </div>
                        <h3 className='text-xl font-semibold mb-2'>24/7 Support</h3>
                        <p className='text-gray-600'>Our support team is always available to help you.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features