import Logo from "./Components/Logo";

export default function LoginScreenIntro(){
    return (
        <div className="w-6/12 flex flex-col bg-white-div">
          <Logo/>
          <div className="font-lato-bold text-black text-5xl self-center">
            <p className="mt-15 text-center">Planeje hoje.</p>
            <p className="mt-2 text-start">Economize mais.</p>
          </div>
          <img src="src\assets\undraw_credit-card-payments.svg" className="h-[462px] w-[428px] mx-auto" alt="Placeholder"></img>
          <div className="max-w-[85%] w-full text-xl text-[black] text-center mx-8">
            <p className="font-lato-light">Você já deu o primeiro passo. O caminho da liberdade financeira começa com uma escolha — e você já a fez. Agora é hora de transformar sonhos em planos, e planos em conquistas.</p>
          </div>
        </div>
    )
}