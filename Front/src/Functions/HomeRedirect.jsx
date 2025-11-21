import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export function HomeRedirect() {
    
    const navigate = useNavigate()
    const userIsLoggedIn = localStorage.getItem("isLoggedIn")
    if(userIsLoggedIn != "true") {
        navigate('/')
    }
}
