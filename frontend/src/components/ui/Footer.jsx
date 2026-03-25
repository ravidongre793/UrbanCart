import React from 'react'
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react'

const Footer = () => {
    return (
        <footer className='bg-[#1a1f3d] text-white'>
            <div className='max-w-7xl mx-auto px-6 py-12'>
                <div className='grid md:grid-cols-4 gap-10'>
                    {/* Brand Section */}
                    <div>
                        <h3 className='text-2xl font-bold mb-3'>
                            <span className='text-pink-500'>E</span>KART
                        </h3>
                        <p className='text-gray-400 text-sm mb-4'>Powering Your World with the Best in Electronics.</p>
                        <div className='space-y-2 text-gray-400 text-sm'>
                            <p className='flex items-start gap-2'><MapPin size={16} className='mt-0.5 shrink-0' /> 123 Electronics St, Style City, NY 10001</p>
                            <p className='flex items-center gap-2'><Mail size={16} className='shrink-0' /> Email: support@Zaptro.com</p>
                            <p className='flex items-center gap-2'><Phone size={16} className='shrink-0' /> Phone: (123) 456-7890</p>
                        </div>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Customer Service</h3>
                        <ul className='space-y-2 text-sm'>
                            <li><a href="#" className='text-gray-400 hover:text-white transition-colors'>Contact Us</a></li>
                            <li><a href="#" className='text-gray-400 hover:text-white transition-colors'>Shipping & Returns</a></li>
                            <li><a href="#" className='text-gray-400 hover:text-white transition-colors'>FAQs</a></li>
                            <li><a href="#" className='text-gray-400 hover:text-white transition-colors'>Order Tracking</a></li>
                            <li><a href="#" className='text-gray-400 hover:text-white transition-colors'>Size Guide</a></li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Follow Us</h3>
                        <div className='flex gap-4'>
                            <a href="#" className='w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-all'>
                                <Facebook size={18} />
                            </a>
                            <a href="#" className='w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-all'>
                                <Instagram size={18} />
                            </a>
                            <a href="#" className='w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-all'>
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Stay in the Loop */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Stay in the Loop</h3>
                        <p className='text-gray-400 text-sm mb-4'>Subscribe to get special offers, free giveaways, and more</p>
                        <div className='flex'>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className='flex-1 px-4 py-2 bg-gray-700 text-white text-sm rounded-l-md border-none outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-pink-500'
                            />
                            <button className='px-4 py-2 bg-pink-500 text-white text-sm font-semibold rounded-r-md hover:bg-pink-600 transition-colors cursor-pointer'>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='border-t border-gray-700'>
                <div className='max-w-7xl mx-auto px-6 py-4 text-center'>
                    <p className='text-gray-500 text-sm'>&copy; 2026 <span className='text-pink-500'>EKart</span>. All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer