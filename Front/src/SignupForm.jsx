import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import UserContext from "./UserContext"
import {AuthContext} from "./UserContext"


export default function SignupForm() {

    const {user, setUser, id, setId, email, setEmail} = useContext(AuthContext)
    
    const navigate = useNavigate() // Hook do React Router

    async function checkSubmitSignup() {
        const userFirstName = document.getElementById('SignupUserFirstName')
        const userLastName = document.getElementById('SignupUserLastName')
        const userEmail = document.getElementById('SignupUserEmail')
        const userPassword = document.getElementById('SignupUserPassword')
        const fullName = `${userFirstName.value} ${userLastName.value}`

        const signupData = {
            nome: fullName,
            email: userEmail.value,
            senha: userPassword.value
        }

        //console.log(signupData)

        const data = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData)
        }).then(res => {
            if(!res.ok) {
                console.log(res)
                return
            }

            return res.json()
        })
        
        const signupUserId = data.id
        setId(signupUserId)

        const signupUserName = data.nome
        setUser(signupUserName)

        const signupUserEmail = data.email
        setEmail(signupUserEmail)

        sessionStorage.setItem("loggedUsername", signupUserName)
        sessionStorage.setItem("userId", signupUserId)
        sessionStorage.setItem("userEmail", signupUserEmail)
        localStorage.setItem("theme", "light") //tema padrão do site
        
        navigate('/dashboard') // Redireciona para /dashboard
    }

    function ShowHidePwd() {
            const icon = document.getElementById('PasswordIcon')
            const pwd = document.getElementById('SignupUserPassword')
            if(pwd.type == "password") {
                pwd.type = "text"
                icon.src = "src/assets/eye-password-hide.svg"
            }
            else {
                pwd.type = "password"
                icon.src = "src/assets/eye-password-show.svg"
            }
            
        }

    return(
        <div className="flex flex-col">
            <form className="flex flex-wrap w-full gap-8 mb-4">
                <div className="flex flex-wrap flex-[0_0_100%]">
                    <span className="text-black self-start text-left font-lato-bold text-sm flex-[0_0_100%]">Coloque seu nome:</span>
                    <input id="SignupUserFirstName" placeholder="Seu Nome" type="text" className="flex-[0_0_45%] font-lato-bold border-b-2 border-gray-outline text-black opacity-75 outline-none"></input>
                    <input id="SignupUserLastName" placeholder="Seu Sobrenome" type="text" className="flex-[0_0_45%] ml-[5%] font-lato-bold border-b-2 border-gray-outline text-black opacity-75 outline-none"></input>
                </div>
                <div className="flex flex-wrap flex-[0_0_60%]">
                    <span className="text-black self-start text-left font-lato-bold text-sm flex-[0_0_100%]">Coloque seu email:</span>
                    <input id="SignupUserEmail" placeholder="Seu Email" type="email" className="flex-[0_0_100%] font-lato-bold border-b-2 border-gray-outline text-black opacity-75 outline-none"></input>
                </div>
                <div className="relative flex-[0_0_60%]"> {/* mudar de relativo pra flex-row e botar 'coloque sua senha:' */}
                    <input id="SignupUserPassword" placeholder="Sua Senha" type="password" className=" w-full font-lato-bold border-b-2 border-gray-outline text-black opacity-75 outline-none pr-10"></input>
                    <button type="button" onClick={() => ShowHidePwd()} className="absolute right-2 top-1/2 -translate-y-2/2">
                        <img id="PasswordIcon" src="src/assets/eye-password-show.svg" alt="icone senha" className="w-6 h-6 opacity-75"></img>
                    </button>
                </div>
            </form>
            <div className="flex justify-center my-auto p-4">
                <button type="button" onClick={checkSubmitSignup} className="font-lato-bold bg-logo-primary rounded-full w-56 h-16 text-white justify-center hover:cursor-pointer">CADASTRAR</button>
            </div>
        </div>
    )
}