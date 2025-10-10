import { createContext, useState } from "react";



export const AuthContext = createContext()
  
export default function UserContext({children}) {
  const [user, setUser] = useState("AAAAAA");
  const [id, setId] = useState(999);
  const [email, setEmail] = useState("e@mail.com");
  
  return(
    <AuthContext.Provider value={{user, setUser, id, setId, email, setEmail}}>
      {children}
    </AuthContext.Provider>
  )
}