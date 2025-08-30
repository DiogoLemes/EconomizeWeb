import { useState } from 'react'
import './App.css'
import LoginScreenIntro from './LoginScreenIntro'
import IntroScreenButton from './IntroScreenButton'
import LoginScreenWelcomeMenu from './LoginScreenWelcomeMenu'
import LoginUserBox from './LoginUserBox'
import SignInUserBox from './SignInUserBox'

function App() {

  return (
    <>
      <div className="flex max-h-full min-h-screen max-w-full h-full w-full p-1">
        <LoginScreenIntro/>
        <div className="bg-black h-auto w-0.5"></div>
        {/* <LoginUserBox /> */}
        <SignInUserBox />
        {/* <LoginScreenWelcomeMenu /> */}
      </div>
    </>
  )
}

export default App
