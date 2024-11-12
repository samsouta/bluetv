import { Text } from '@mantine/core';
import { Modal, useDisclosure } from '@nextui-org/react';
import { Alert, Button } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiViber } from "react-icons/si";
import Swal from 'sweetalert2';
import photo1 from "../assets/image/1.jpg"
import photo2 from "../assets/image/2.jpg"
import photo3 from "../assets/image/3.jpg"
import { stateContext } from '../context/StateContext';

const About = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { isOpen, open, close } = useDisclosure();

  const { contentRef } = useContext(stateContext);

  const handleAlert = () => {
    Swal.fire({
      title: 'Welcome to Our E-Commerce Site!',
      text: 'Here you can learn more about our products and services.',
      icon: 'info',
      confirmButtonText: 'Got it!',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#004d6f] via-[#007c8e] to-[#00ac90] text-white">
      {/* Section 1: Header */}
      <div className="text-center py-24 sm:py-32 md:py-40 animate__animated animate__fadeIn animate__delay-1s">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl montserrat font-extrabold leading-tight text-[#c891bf]">
          About Us
        </h1>
        <p className="mt-6 kanit-light text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto text-[#a7aabd]">
        I’m a passionate full-stack developer with expertise in both front-end and back-end technologies. I enjoy solving complex problems and building scalable, user-friendly applications. With a strong foundation in coding, I work with various tools and frameworks to create efficient solutions. Whether it’s designing an intuitive user interface or developing the back-end architecture, I’m committed to delivering high-quality, functional projects. I’m always learning and evolving to stay up to date with the latest trends in technology.
        </p>
      </div>

      {/* Section 2: Mission Statement */}
      <div className="bg-[#3c3b5f] py-16 px-6 sm:px-12 md:px-24 text-center">
        <Text h3 className="text-3xl sm:text-4xl montserrat font-semibold text-[#fbb0da]">Our Mission</Text>
        <p className="mt-4 kanit-light text-lg sm:text-xl md:text-2xl text-[#a7aabd] max-w-3xl mx-auto">
        Our mission is to create innovative and efficient solutions that meet the needs of our users. We are committed to delivering high-quality, reliable products that enhance the user experience. By leveraging the latest technologies and staying focused on continuous improvement, we aim to empower individuals and businesses to achieve their goals. We believe in the power of collaboration, creativity, and dedication to making a positive impact through our work.
        </p>
      </div>

      {/* Section 3: Product Categories */}
      <div className="py-16 px-6 sm:px-12 bg-[#9673a0] text-center">
        <h2 className="text-3xl sm:text-4xl text-white montserrat font-semibold mb-12">Explore Our Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-[#c891bf] p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105">
            <img src={photo1} alt="Electronics" className="w-full h-48 object-cover rounded-xl mb-6" />
            <p className="text-xl montserrat font-semibold text-[#434656]">successful project</p>
          </div>
          <div className="bg-[#c891bf] p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105">
            <img src={photo2} alt="Clothing" className="w-full h-48 object-cover object-top  rounded-xl mb-6" />
            <p className="text-xl montserrat font-semibold text-[#434656]">successful project</p>
          </div>
          <div className="bg-[#c891bf] p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105">
            <img src={photo3} alt="Accessories" className="w-full h-48 object-cover object-top  rounded-xl mb-6" />
            <p className="text-xl montserrat font-semibold text-[#434656]">successful project</p>
          </div>
        </div>
      </div>

      {/* Section 4: Customer Testimonials */}
      <div className="bg-[#675680] py-16 px-6 sm:px-12 text-center">
        <Text h3 className="text-3xl montserrat sm:text-4xl text-white font-semibold">What Our Customers Say</Text>
        <div className="mt-12 flex flex-wrap justify-center gap-12">
          <div className="bg-[#fbb0da] p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 max-w-sm">
            <p className="text-lg mb-4 kanit-light text-[#434656]">"Working with samsouta was an amazing experience. The website they built for us is not only functional but also beautifully designed and easy to navigate."</p>
            <p className="font-semibold montserrat text-[#3c3b5f]">Rostam.</p>
          </div>
          <div className="bg-[#fbb0da] p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 max-w-sm">
            <p className="text-lg mb-4 kanit-light text-[#434656]">samsouta took the time to understand our needs and delivered a high-quality, responsive website that exceeded our expectations.”</p>
            <p className="font-semibold montserrat text-[#3c3b5f]">NAZZ .</p>
          </div>
          <div className="bg-[#fbb0da] p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 max-w-sm">
            <p className="text-lg mb-4 kanit-light text-[#434656]">"သူတို့ဖန်တီးပေးတဲ့ ဝဘ်ဆိုဒ်ဟာ အရမ်းအသုံးပြုရလွယ်ကူပြီး ပုံစံလှလှလေး ဖြစ်ပါတယ်"</p>
            <p className="font-semibold montserrat text-[#3c3b5f]">Naythan. </p>
          </div>
        </div>
      </div>

      {/* Section 6: Modal with More Information */}
      <div className="text-center py-8">
        <Button auto color="gradient" onClick={open}>
          Learn More About Us
        </Button>
      </div>

      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Text h4>Our Vision</Text>
        </Modal.Header>
        <Modal.Body>
          <p>
            We envision a world where technology seamlessly integrates with daily life, improving efficiency and user experiences for all.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Section 7: Contact Information */}
      <div ref={contentRef} id='contact-me' className="bg-[#3c3b5f] py-16 text-center">
        <h2 className="text-3xl sm:text-4xl montserrat text-white">Contact Us</h2>
        <p className="mt-4 text-lg sm:text-xl kanit-medium text-white">We would love to hear from you!</p>
        <div className="mt-6 flex justify-center gap-6">
          <a href="https://github.com/samsouta" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-3xl sm:text-4xl text-white transform transition-all duration-300 hover:scale-125" />
          </a>
          <a href="https://www.linkedin.com/in/sam-souta-a28384321/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-3xl sm:text-4xl text-white transform transition-all duration-300 hover:scale-125" />
          </a>
          <a href="viber://contact?number=+601117901410" target="_blank" rel="noopener noreferrer">
            <SiViber className="text-3xl sm:text-4xl text-white transform transition-all duration-300 hover:scale-125" />
          </a>
        </div>
      </div>

      {/* Section 8: Alerts */}
      {showAlert && (
        <Alert color="info" className="mt-4 mx-8 sm:mx-16 md:mx-32">
          <span className="font-medium">Note:</span> This is a mock-up About page with interactive features for demonstration purposes.
        </Alert>
      )}
    </div>
  );
};

export default About;
