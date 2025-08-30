import Logo from "./Logo";


export default function LoginScreenIntro(){
    return (
        <div className="w-6/12 grow bg-[#FBFBFE]">
          <Logo/>
          <p className="font-family: 'Lato', sans-serif text-black mt-15 font-bold text-5xl">Planeje hoje.</p>
          <p className="font-family: 'Lato', sans-serif text-black mt-2 font-bold text-5xl">Economize mais.</p>
          <img src="src\assets\undraw_credit-card-payments.svg" className="h-[462px] w-[428px] mx-auto" alt="Placeholder"></img>
          <div className="max-w-[85%] w-full text-xl text-[black] text-center mx-8">
            <p className="lato-light">Você já deu o primeiro passo. O caminho da liberdade financeira começa com uma escolha — e você já a fez. Agora é hora de transformar sonhos em planos, e planos em conquistas.</p>
          </div>
        </div>
    )
}