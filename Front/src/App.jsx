import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Transacoes from './Transacoes.jsx'

function App() {
  return (
    <Routes>
      {/* Rota para a página de transações */}
      <Route path="/transacoes" element={<Transacoes />} />
      
      {/* Você pode adicionar suas outras rotas aqui */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

      {/* Rota padrão: redireciona para /transacoes */}
      <Route path="/" element={<Navigate to="/transacoes" replace />} />
    </Routes>
  )
}

export default App