import{r as m,j as e,o as s,S as d}from"./index-BJ3nLALq.js";const x=()=>{const[t,o]=m.useState({name:"",email:"",message:""}),i=a=>{const{name:l,value:r}=a.target;o(c=>({...c,[l]:r}))},n=a=>{a.preventDefault(),console.log("Form submitted:",t),o({name:"",email:"",message:""}),d.fire("Thank you for your message! We will get back to you soon.")};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-[#2b4242] to-[#007c8e] text-white",children:[e.jsx("header",{className:"container mx-auto px-4 py-8",children:e.jsx(s.h1,{className:"text-4xl md:text-6xl font-bold text-center",initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{duration:.5},children:"Welcome to Our Creative Studio"})}),e.jsxs("main",{className:"container mx-auto px-4 py-12",children:[e.jsxs(s.section,{className:"mb-16",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:.2},children:[e.jsx("h2",{className:"text-3xl font-semibold mb-4",children:"Our Services"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:["Web Design","Branding","Digital Marketing"].map((a,l)=>e.jsxs(s.div,{className:"bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6",whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.3,delay:l*.1},children:[e.jsx("h3",{className:"text-xl font-semibold mb-2",children:a}),e.jsxs("p",{children:["We offer top-notch ",a.toLowerCase()," services tailored to your needs."]})]},a))})]}),e.jsxs(s.section,{className:"mb-16",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:.4},children:[e.jsx("h2",{className:"text-3xl font-semibold mb-4",children:"Why Choose Us?"}),e.jsxs("ul",{className:"list-disc list-inside space-y-2",children:[e.jsx("li",{children:"Over 10 years of industry experience"}),e.jsx("li",{children:"Dedicated team of creative professionals"}),e.jsx("li",{children:"Customized solutions for your unique needs"}),e.jsx("li",{children:"Proven track record of successful projects"})]})]}),e.jsxs(s.section,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:.6},children:[e.jsx("h2",{className:"text-3xl font-semibold mb-4",children:"Contact Us"}),e.jsxs("form",{onSubmit:n,className:"max-w-lg mx-auto",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"name",className:"block mb-2",children:"Name"}),e.jsx("input",{type:"text",id:"name",name:"name",value:t.name,onChange:i,required:!0,className:"w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"email",className:"block mb-2",children:"Email"}),e.jsx("input",{type:"email",id:"email",name:"email",value:t.email,onChange:i,required:!0,className:"w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"message",className:"block mb-2",children:"Message"}),e.jsx("textarea",{id:"message",name:"message",value:t.message,onChange:i,required:!0,rows:"4",className:"w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"})]}),e.jsx(s.button,{type:"submit",className:"w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300",whileHover:{scale:1.05},whileTap:{scale:.95},children:"Send Message"})]})]})]})]})})};export{x as default};
