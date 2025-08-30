export default function IntroScreenButton({text}) {
    return (
        <div className="flex self-center">
            <button type="button" className="lato-bold bg-logo-primary rounded-4xl w-56 h-16 text-white justify-center">{text}</button>
        </div>
    )
}