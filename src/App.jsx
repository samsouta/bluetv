import { useState } from 'react'
import './App.css';
import Index from './routes';
import {  Footer,HNavbar } from './components/Layout/index';
function App() {

  return (
    <>
      <HNavbar/>
      <Index/>
      <Footer/>
    </>
  )
}

export default App
