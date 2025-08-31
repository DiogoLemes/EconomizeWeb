import IntroScreenButton from "./WelcomeScreenIntroButton";

export default function LoginUserBox() {
    return (
        <div className="max-w-[50%] w-6/12">
            <div className="flex flex-wrap justify-evenly w-8/12 h-7/12 border ml-[17.5%] mt-[17.5%] rounded-[2%] border-solid border-[black] p-10">
                <button className="lato-bold text-gray-700 opacity-75 hover:bg-[#E3E3FF] hover:text-black hover:opacity-100 flex-[0_0_50%] h-12">Entrar</button>
                <button className="lato-bold border-3 text-black hover:bg-[#E3E3FF] border-b-logo-primary border-t-0 border-r-0 border-l-0 flex-[0_0_50%] h-12">Cadastrar</button>
               <form className="flex flex-wrap w-full gap-8 mb-4">
                    <div className="flex flex-wrap flex-[0_0_100%]">
                        <span className="text-black self-start text-left lato-bold text-sm flex-[0_0_100%]">Coloque seu nome:</span>
                        <input placeholder="Seu Nome" type="text" className="flex-[0_0_45%] lato-bold border-b-2 border-[#525252] text-black opacity-75 outline-none"></input>
                        <input placeholder="Seu Sobrenome" type="text" className="flex-[0_0_45%] ml-[5%] lato-bold border-b-2 border-[#525252] text-black opacity-75 outline-none"></input>
                    </div>
                    <div className="flex flex-wrap flex-[0_0_60%]">
                        <span className="text-black self-start text-left lato-bold text-sm flex-[0_0_100%]">Coloque seu email:</span>
                        <input placeholder="Seu Email" type="email" className="flex-[0_0_100%] lato-bold border-b-2 border-[#525252] text-black opacity-75 outline-none"></input>
                    </div>
                    <div className="relative flex-[0_0_60%]">
                        <input placeholder="Sua Senha" type="password" className=" w-full lato-bold border-b-2 border-[#525252] text-black opacity-75 outline-none pr-10"></input>
                        <button type="button" className="absolute right-2 top-1/2 -translate-y-2/2">
                            <img src="src\assets\eye-password-show.svg" alt="Mostrar senha" className="w-6 h-6 opacity-75"></img>
                        </button>
                    </div>
                </form>
                    <IntroScreenButton text="CADASTRAR"/>
            </div>
        </div>
    )
}