import { Button, Input } from '@nextui-org/react'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";


export default function Footer() {
  const nav = useNavigate()
  const handleAbout = () => {
    nav('/about')
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll effect
    });
  }
  // scroll to content-me 
  const scrollToContent = () => {
    nav('/about#contact-me');
    console.log('work');
  };
  return (
    <footer className="bg-[#93a4ab] mt-24 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl kablammo font-semibold mb-4">BlueTVV</h3>
            <p className="text-gray-700 p-text">သိုင်းသမား ညီကိုတို့min ga lar par အလုပ်ကိစ္စ ဆက်သွယ်ချင်ရင် အောက် က link ကနေတစ်ဆင့်ဆက်သွယ်နိုင်ပါတယ်</p>
          </div>
          <div className="mb-5 md:mb-0">
            <div className="w-full sm:w-1/3 mb-6">
              <h3 className="text-xl head-font text-gray-700 mb-2">Quick Links</h3>
              <ul>
                <Link to={`/home`} ><li><a className="text-gray-700 sub-font hover:text-[#2b4242]">Home</a></li></Link>
                <li><a onClick={handleAbout} className="text-gray-700 sub-font hover:text-[#2b4242]">About</a></li>
                <div onClick={scrollToContent} ><li><a className="text-gray-700sub-font hover:text-[#2b4242]">Content</a></li></div>

              </ul>
            </div>
          </div>
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-700">SS/30, Kelana Jaya, 47302,Petaling Jaya, Selangor, Malaysia</p>
            <p className="text-gray-700">Email: darkken415@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-700 mb-2">Stay updated with our latest news and offers.</p>
            <form className="flex flex-col space-y-2">
              <Input type="email" placeholder="Your email" className="bg-white text-gray-800 border-gray-300" />
              <Button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 text-sm mb-4 md:mb-0">&copy; 2024 BlueTVV. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                <FaFacebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                <FaTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                <FaInstagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                <FaLinkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                <IoMdMail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}