import { createContext, useState } from "react"

export const AuthContext = createContext()
  
export default function UserContext({children}) {

  //fazer um fetch user por Id talvez? Precisaria definir os valores no login ou cadastro e setar aq
  const [user, setUser] = useState(undefined)
  const [id, setId] = useState(0)
  const [email, setEmail] = useState(undefined)
  const [userPfp, setUserPfp] = useState("src/assets/Foto de Perfil Padrão.svg")
  
  return(
    <AuthContext.Provider value={{user, setUser, id, setId, email, setEmail, userPfp, setUserPfp}}>
      {children}
    </AuthContext.Provider>
  )
}