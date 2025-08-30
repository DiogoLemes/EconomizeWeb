import IntroScreenButton from "./IntroScreenButton";

export default function LoginUserBox() {
    return (
        <div className="max-w-[50%] w-6/12">
            <div className="flex flex-wrap justify-evenly w-8/12 h-7/12 border ml-[17.5%] mt-[17.5%] rounded-[2%] border-solid border-[black] p-10">
                <button className="lato-bold text-gray-700 opacity-75 hover:bg-[#E3E3FF] hover:text-black hover:opacity-100 flex-[0_0_50%] font-bold h-15">Entrar</button>
                <button className="lato-bold border-3 text-black hover:bg-[#E3E3FF] border-b-logo-primary border-t-0 border-r-0 border-l-0 flex-[0_0_50%] font-bold h-15">Cadastrar</button>
                <button className="hover:bg-[#E4E4E6] hover:opacity-80 flex items-center justify-center flex-[0_0_100%] border border-black w-4/5 max-w-4/5 h-13 max-h-20 rounded-md my-[5%] px-4 py-2">
                    <img src="src\assets\logo_google_icon.svg" alt="Google logo" className="w-6 h-6" />
                    <span className="lato-bold text-md font-bold text-black">Fazer Login com o Google</span>
                </button>
                <div className="w-1/3 h-0.5 self-center bg-[#525252] opacity-75 flex-[0_0_33%]"></div>
                <span className="w-1/3 h-6 self-center text-[#525252] flex-[0_0_33%]">ou</span>
                <div className="w-1/3 h-0.5 self-center bg-[#525252] opacity-75 flex-[0_0_33%]"></div>
               <form className="flex flex-col w-full gap-14 my-4">
                    <input placeholder="Seu Email" type="email" className="lato-bold border-b-2 border-[#525252] text-black opacity-75 outline-none"></input>
                    <div className="relative">
                        <input placeholder="Sua Senha" type="password" className="w-full lato-bold border-b-2 border-[#525252] text-black opacity-75 outline-none pr-10"></input>
                        <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2">
                            <img src="src\assets\eye-password-show.svg" alt="Mostrar senha" className="w-6 h-6 opacity-75"></img>
                        </button>
                    </div>
                </form>
                    <IntroScreenButton text="ENTRAR"/>
                
            </div>
        </div>
    )
}