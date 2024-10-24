import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
  return (
    <div className='max-w-[767px]'>
      <Header />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default App