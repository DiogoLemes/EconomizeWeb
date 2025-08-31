import { useState } from 'react'
import './App.css'
import WelcomeScreen from './WelcomeScreen'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Dashboard from './Dashboard'

function App() {

  return (
    <>
      <div className="flex flex-wrap">
        {/* <WelcomeScreen/> */}
        <div className='flex-[0_0_12%]'>
          <Sidebar/>
        </div>
        <div className='flex-[0_0_88%]'>
          <Dashboard/>
        </div>
        <div className='flex-[0_0_100%]'>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default App
