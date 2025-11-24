import React from 'react'
import { useEffect, useState } from 'react';

export function ThemeSetter() {
    
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark")
        return true
    } 
    else {
        document.documentElement.classList.remove("dark")
        return false
    }
}
