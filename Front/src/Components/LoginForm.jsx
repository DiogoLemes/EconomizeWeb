import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../UserContext"
import {AuthContext} from "../UserContext"

export default function LoginForm() {
    
    const navigate = useNavigate() // Hook do React Router

    const {user, setUser, id, setId, email, setEmail} = useContext(AuthContext)

    async function checkSubmitLogin() {
        const userEmail = document.getElementById('LoginUserEmail')
        const userPassword = document.getElementById('LoginUserPassword')

        const loginData = {
            email: userEmail.value,
            senha: userPassword.value
        }

        //console.log(loginData)

        const data = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        }).then(res => {
            if(!res.ok) {
                //console.log(res)
                return
            }
            return res.json()
        })

        const loginUserId = data.id
        setId(loginUserId)
        const loginUsername = data.nome
        setUser(loginUsername)
        const loginUserEmail = data.email
        setEmail(loginUserEmail)


        sessionStorage.setItem("loggedUsername", loginUsername)
        sessionStorage.setItem("userId", loginUserId)
        sessionStorage.setItem("userEmail", loginUserEmail)

        navigate('/dashboard') // Redireciona para /dashboard
    }

    function ShowHidePwd() {
            const icon = document.getElementById('PasswordIcon')
            const pwd = document.getElementById('LoginUserPassword')
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
        <div className="w-full h-full flex flex-col gap-4">
            <button className="hover:bg-google-button-hover hover:opacity-80 hover:cursor-pointer flex items-center justify-center border border-black w-4/5 max-w-4/5 h-13 max-h-20 rounded-md mx-auto px-4 py-2">
                <img src="src\assets\logo_google_icon.svg" alt="Google logo" className="w-6 h-6" />
                <span className="font-lato-bold text-md text-black">Fazer Login com o Google</span>
            </button>
            <div className="flex flex-row mt-4">
                <div className="w-1/3 h-0.5 self-center bg-gray-outline opacity-75"></div>
                <span className="w-1/3 h-6 self-center text-center text-gray-outline">ou</span>
                <div className="w-1/3 h-0.5 self-center bg-gray-outline opacity-75"></div>
            </div>
            <form className="flex flex-col w-full gap-14 my-4">
                <input id="LoginUserEmail" placeholder="Seu Email" type="email" className=" font-lato-bold border-b-2 border-gray-outline text-black opacity-75 outline-none"></input>
                <div className="relative">
                    <input id="LoginUserPassword" placeholder="Sua Senha" type="password" className="w-full font-lato-bold border-b-2 border-gray-outline text-black opacity-75 outline-none pr-10"></input>
                    <button type="button" onClick={ShowHidePwd} className="absolute right-2 top-1/2 -translate-y-1/2">
                        <img id="PasswordIcon" src="src\assets\eye-password-show.svg" alt="icone senha" className="w-6 h-6 opacity-75 mb-1"></img>
                    </button>
                </div>
            </form>
            <div className="flex justify-center mb-auto mx-auto p-4">
                <button type="button" onClick={checkSubmitLogin}  className="font-lato-bold bg-logo-primary rounded-full w-56 h-16 text-white justify-center hover:cursor-pointer">ENTRAR</button>
            </div>
        </div>
   )
}