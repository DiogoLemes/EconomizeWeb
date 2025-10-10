import WelcomeScreenIntro from "./WelcomeScreenIntro";
import WelcomeScreenMenu from "./WelcomeScreenMenu";
import SignUpBox from './SignUpBox'

  export default function WelcomeScreen() {
  
    return (
      <div className="flex max-h-full min-h-screen max-w-full h-full w-full p-1">
        <WelcomeScreenIntro />
        <div className="bg-black h-auto w-0.5"></div>
        <SignUpBox />
        {/* <WelcomeScreenMenu /> //substituir pela signupbox quando clicar no botão de quero conhecer*/}
      </div>
    )
}