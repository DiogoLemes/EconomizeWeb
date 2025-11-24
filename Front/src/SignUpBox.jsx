import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm"
import { useState } from "react";


export default function SignUpBox() {
    
    const inactiveButtonClass = "font-lato-bold text-gray-700 opacity-75 hover:bg-button-active hover:text-black hover:opacity-100 hover:cursor-pointer flex-[0_0_50%] h-12"
    const activeButtonClass = "font-lato-bold border-3 text-black bg-button-active border-b-logo-primary border-t-0 border-r-0 border-l-0 hover:cursor-pointer flex-[0_0_50%] h-12"

    const [botaoLogin, setbotaoLogin] = useState(false)
    const [botaoCadastro, setbotaoCadastro] = useState(true)

    function toggleAba(abaCadastro){
    if(abaCadastro){
        setbotaoLogin(false)
        setbotaoCadastro(true)
    }
    else {
        setbotaoLogin(true)
        setbotaoCadastro(false)
    }
    }

    return (
        <div className="max-w-[50%] w-6/12">
            <div className="flex flex-col gap-8 w-8/12 border ml-[17.5%] mt-[17.5%] rounded-[2%] border-solid border-[black] p-10">
                <div className="flex flex-row">
                    <button id="loginButton" onClick={() => toggleAba(false)} className={`${botaoLogin ? activeButtonClass : inactiveButtonClass}`}>Entrar</button>
                    <button id="signupButton" onClick={() => toggleAba(true)} className={`${botaoCadastro ? activeButtonClass : inactiveButtonClass}`}>Cadastrar</button>
                </div>
                {botaoCadastro ? <SignupForm /> : <LoginForm />}
            </div>
        </div>
    )
}