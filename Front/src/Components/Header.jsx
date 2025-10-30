import React, { useContext } from 'react'
import { AuthContext } from '../UserContext'

export default function Header({text}) {
  
    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)
  
    return (
    <div>
        <div className="flex flex-row p-2">
            <span className="text-4xl mx-auto font-lato-bold">{text}</span>
            <div className="flex flex-row gap-2">
                <img src={userPfp} className="w-8 h-8 rounded-[50%]"/>
                <span className="font-lato-regular mr-16 text-end">{user}</span>
            </div>
        </div>
    </div>
  )
}
