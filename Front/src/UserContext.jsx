import { createContext, useState } from "react";

export const AuthContext = createContext()
  
export default function UserContext({children}) {

  //fazer um fetch user por Id talvez?
  const [user, setUser] = useState("AAAAAA")
  const [id, setId] = useState(17)
  const [email, setEmail] = useState("e@mail.com")
  const [userPfp, setUserPfp] = useState("src/assets/Foto de Perfil Padrão.svg")
  
  return(
    <AuthContext.Provider value={{user, setUser, id, setId, email, setEmail, userPfp, setUserPfp}}>
      {children}
    </AuthContext.Provider>
  )
}