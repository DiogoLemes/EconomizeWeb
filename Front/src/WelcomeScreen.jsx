import LoginScreenIntro from "./WelcomeScreenIntro";
import LoginScreenWelcomeMenu from "./WelcomeScreenMenu";
import LoginUserBox from "./LoginBox";
import SignInUserBox from './SignUpBox'

export default function LoginScreen() {
    return (
        <div className="flex max-h-full min-h-screen max-w-full h-full w-full p-1">
        <LoginScreenIntro />
        <div className="bg-black h-auto w-0.5"></div>
        {/* <LoginUserBox /> */}
        <SignInUserBox />
        {/* <LoginScreenWelcomeMenu /> */}
      </div>
    )
}