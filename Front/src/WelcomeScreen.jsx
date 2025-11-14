import WelcomeScreenIntro from "./WelcomeScreenIntro";
import WelcomeScreenMenu from "./WelcomeScreenMenu";
import SignUpBox from './SignUpBox'
import { useState, useEffect } from "react";

  export default function WelcomeScreen() {
    
    const [introSeen, setIntroSeen] = useState(false);

    useEffect(() => {
      let introCookie = document.cookie
      if(introCookie == "intro-passed=true") {setIntroSeen(true)}
      localStorage.setItem("empty dashboard", true)
    }, []);


    return (
      <div className="flex max-h-full min-h-screen max-w-full h-full w-full p-1">
        <WelcomeScreenIntro />
        <div className="bg-black h-auto w-0.5"></div>
        {introSeen ? <SignUpBox /> : <WelcomeScreenMenu setIntroSeen={setIntroSeen}/>}
      </div>
    )
}