import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm"
import { useState } from "react";


export default function SignUpBox() {

    // fetch("/mock.json")
    // .then((res) => res.json())
    // .then((data) => console.log(data));

    const [showForm, setShowForm] = useState(true)
    
    //classe dos botões quase implementada, do jeito q ta o botao de cadastro fica ativo msm quando muda pra login (a menos q clique dnv)
    const inactiveButtonClass = "lato-bold text-gray-700 opacity-75 hover:bg-[#E3E3FF] hover:text-black hover:opacity-100 flex-[0_0_50%] h-12"
    const activeButtonClass = "lato-bold border-3 text-black bg-[#E3E3FF] border-b-logo-primary border-t-0 border-r-0 border-l-0 flex-[0_0_50%] h-12"
    const loginbtn = document.getElementById("loginButton")
    const signupbtn = document.getElementById("signupButton")

    function ToggleForm(text) {
        if(text == "login"){
            setShowForm(false)
            loginbtn.className = activeButtonClass
            signupbtn.className = inactiveButtonClass
            console.log('clicked login')
        }
        else {
            loginbtn.className = inactiveButtonClass
            signupbtn.className = activeButtonClass
            setShowForm(true)
            console.log('clicked signup')
        }
        
        
    }

    return (
        <div className="max-w-[50%] w-6/12">
            <div className="flex flex-wrap justify-evenly w-8/12 h-7/12 border ml-[17.5%] mt-[17.5%] rounded-[2%] border-solid border-[black] p-10">
                <button id="loginButton" onClick={()=>ToggleForm("login")} className={inactiveButtonClass}>Entrar</button>
                <button id="signupButton" onClick={()=>ToggleForm("signup")} className={activeButtonClass}>Cadastrar</button>
                {showForm ? <SignupForm /> : <LoginForm />}
            </div>
        </div>
    )
}