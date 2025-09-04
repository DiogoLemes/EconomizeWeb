import { useNavigate } from "react-router-dom"

export default function SignupForm() {
    function ConsoleLog() {
        const userFirstName = document.getElementById('SignupUserFirstName')
        const userLastName = document.getElementById('SignupUserLastName')
        const userEmail = document.getElementById('SignupUserEmail')
        const userPassword = document.getElementById('SignupUserPassword')

        try{
            const fullName = `${userFirstName.value} ${userLastName.value}`
            console.log("fullname:" + fullName)
        } catch {console.error();}
        console.log(userFirstName.value)
        console.log(userLastName.value)
        console.log(userEmail.value)
        console.log(userPassword.value)
    }

    const navigate = useNavigate(); // Hook do React Router

    const handleClick = () => {
        navigate('/dashboard'); // Redireciona para /dashboard
    };

    // function ShowHidePwd() {
        //     const icon = document.getElementById('PasswordIcon')
        //     const pwd = document.getElementById('SignupUserPassword')
        //     if(pwd.type == "password") {
        //         pwd.type = "text";
        //         icon.src = "src/assets/eye-password-hide.svg"
        //     }
        //     else {
        //         pwd.type = "password";
        //         icon.src = "src/assets/eye-password-show.svg"
        //     }
            
        // }

    return(
        <div className="flex flex-col">
            <form className="flex flex-wrap w-full gap-8 mb-4">
                <div className="flex flex-wrap flex-[0_0_100%]">
                    <span className="text-black self-start text-left lato-bold text-sm flex-[0_0_100%]">Coloque seu nome:</span>
                    <input id="SignupUserFirstName" placeholder="Seu Nome" type="text" className="flex-[0_0_45%] lato-bold border-b-2 border-[#525252] text-black opacity-75 outline-none"></input>
                    <input id="SignupUserLastName" placeholder="Seu Sobrenome" type="text" className="flex-[0_0_45%] ml-[5%] lato-bold border-b-2 border-[#525252] text-black opacity-75 outline-none"></input>
                </div>
                <div className="flex flex-wrap flex-[0_0_60%]">
                    <span className="text-black self-start text-left lato-bold text-sm flex-[0_0_100%]">Coloque seu email:</span>
                    <input id="SignupUserEmail" placeholder="Seu Email" type="email" className="flex-[0_0_100%] lato-bold border-b-2 border-[#525252] text-black opacity-75 outline-none"></input>
                </div>
                <div className="relative flex-[0_0_60%]"> {/* mudar de relativo pra flex-row e botar 'coloque sua senha:' */}
                    <input id="SignupUserPassword" placeholder="Sua Senha" type="password" className=" w-full lato-bold border-b-2 border-[#525252] text-black opacity-75 outline-none pr-10"></input>
                    <button type="button" onClick={ConsoleLog} className="absolute right-2 top-1/2 -translate-y-2/2">
                        <img id="PasswordIcon" src="src/assets/eye-password-show.svg" alt="icone senha" className="w-6 h-6 opacity-75"></img>
                    </button>
                </div>
            </form>
            <div className="flex justify-center my-auto p-4">
                <button type="button" onClick={handleClick} className="lato-bold bg-logo-primary rounded-4xl w-56 h-16 text-white justify-center">CADASTRAR</button>
            </div>
        </div>
    )
}