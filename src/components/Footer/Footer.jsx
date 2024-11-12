import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
    const nav = useNavigate()
    // scroll to content-me 
    const scrollToContent = () => {
        nav('/about#contact-me');
        console.log('work');
      }; 
    return (
        <div>
            <footer className="bg-[#434d6d] text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between">
                        {/* Logo and Description */}
                        <div className="w-full sm:w-1/3 mb-6">
                            <h2 className="text-2xl kablammo font-bold mb-2">BlueTV</h2>
                            <p className="text-white kanit-light">သိုင်းသမား ညီကိုတို့min ga lar par အလုပ်ကိစ္စ ဆက်သွယ်ချင်ရင် အောက် က link ကနေတစ်ဆင့်ဆက်သွယ်နိုင်ပါတယ်</p>
                        </div>

                        {/* Quick Links */}
                        <div className="w-full sm:w-1/3 mb-6">
                            <h3 className="text-xl kanit-semibold mb-2">Quick Links</h3>
                            <ul>
                                <Link to={`/home`} ><li><a className="text-gray-400 kanit-light hover:text-white">Home</a></li></Link>
                                <Link to={`/about`} ><li><a className="text-gray-400 kanit-light hover:text-white">About</a></li></Link>
                                <div onClick={scrollToContent} ><li><a className="text-gray-400 kanit-light hover:text-white">Content</a></li></div>
                                
                            </ul>
                        </div>

                        {/* Social Media Links */}
                        <div className="w-full sm:w-1/3 mb-6">
                            <h3 className="text-xl kanit-semibold mb-2">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/profile.php?id=100072166465565" className="text-gray-400 kanit-light hover:text-white">
                                    <i className="fab fa-facebook-f"></i> Facebook
                                </a>
                                <a href="https://wa.me/601117901410" className="text-gray-400 kanit-light hover:text-white">
                                    <i className="fab fa-twitter"></i> Whatsapp
                                </a>
                                <a href="https://t.me/bluetv_admin" className="text-gray-400 kanit-light hover:text-white">
                                    <i className="fab fa-instagram"></i> Telegram
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-gray-500 mt-6">
                        © {new Date().getFullYear()} BlueTV. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
