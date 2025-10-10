import { useEffect } from "react"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useContext } from "react"
import {AuthContext} from "./UserContext"

export default function Investimentos() {
    
    const {user, setUser, id, setId, email, setEmail} = useContext(AuthContext)
    console.log(user)
    console.log(id)
    console.log(email)
    setUser("nome teste")
    setId(17)
    setEmail("nometeste@email.com")

    const url = `http://localhost:3000/monthGoals/${id}`

    const data = fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });

    return(
        <div className="flex flex-wrap">
            <div className="flex-[0_0_15%]">
                <Sidebar selected="investimentos"/>
            </div>
            <div className="flex-[0_0_85%]">
                <div className="lato-bold flex flex-col text-black">
                    <div className="flex flex-row p-2">
                        <span className="text-4xl mx-auto">Investimentos</span>
                        <span className="lato-regular mr-16 text-end">Nome usuário</span>
                    </div>
                    <div className="flex flex-row justify-between p-4 h-100 w-200 ">
                        <div className="border-[#d4d4d4] border-2 border-dashed rounded-md flex flex-col text-start p-2 h-80 w-80">
                            <span>Metas Ativas</span>
                            <span>Ainda nenhuma meta criada</span>
                        </div>
                        <div className="border-[#d4d4d4] border-2 border-dashed rounded-md flex flex-col text-start p-2 h-80 w-80">
                            <span>Metas Concluídas</span>
                            <span>Ainda nenhuma meta alcançada</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}