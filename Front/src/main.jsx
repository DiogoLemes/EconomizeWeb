import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import WelcomeScreen from './WelcomeScreen.jsx'
import Dashboard from './Dashboard.jsx'
import Transacoes from './Transacoes.jsx'
import Investimentos from './Investimentos.jsx'
import Cartoes from './Cartoes.jsx'
import Perfil from './Perfil.jsx'
import Configuracoes from './Configuracoes.jsx'
import UserContext from './UserContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeScreen/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/transacoes",
    element: <Transacoes/>
  },
  {
    path: "/investimentos",
    element: <Investimentos/>
  },
  {
    path: "/Cartoes",
    element: <Cartoes/>
  },
  {
    path: "/perfil",
    element: <Perfil/>
  },
  {
    path: "/configuracoes",
    element: <Configuracoes/>
  }
])

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <UserContext>
      <RouterProvider router={router}/>
    </UserContext>
  //</StrictMode>,
)
