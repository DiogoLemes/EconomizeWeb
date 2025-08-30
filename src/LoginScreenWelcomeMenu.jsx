import IntroScreenButton from "./IntroScreenButton";

export default function LoginScreenWelcomeMenu() {
    return (
        <div className="bg-color-standard grow max-w-[50%] w-6/12">
          <div className="flex flex-col justify-evenly w-8/12 h-8/12 border ml-[17.5%] mt-[17.5%] rounded-[2%] border-solid border-[black] gap-8 p-8">
            <span className="font-family:'Lato', sans-serif mt-10 font-semibold text-4xl text-black justify-center text-center">BEM VINDO!</span>
            <p className="font-family:'Lato', sans-serif font-semibold text-sm mx-8 text-black text-justify ">O Economize é um site de gerenciamento de finanças focado na experiência do usuário e na segurança de seus dados. Com um design limpo e intuitivo é fácil fazer o que deseja sem se perder ou ficar confuso. Com ferramentas vitais para gerenciar seu dinheiro, metas, despesas e prazos, o Economize se preza por sua simplicidade enquanto mantém suas funcionalidades. Então, vamos conhecer?</p>
            <IntroScreenButton text="QUERO CONHECER"/>
          </div>
        </div>
    )
}