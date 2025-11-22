import React from 'react'
import { useEffect, useState } from 'react';

export function PageUnload() {
    
    window.addEventListener("unload", function () {
        this.sessionStorage.clear()
    })
}
