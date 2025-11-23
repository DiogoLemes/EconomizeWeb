import React, { useContext } from 'react'
import { AuthContext } from '../UserContext'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router'

export default function Header({text}) {
  
    const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)

    //codigo de mostrar itens do header do componente MUI
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const navPerfil = () => {
        navigate('/perfil')
    }
    const navConfig = () => {
        navigate('/configuracoes')
    }

    const Logout = () => {
        sessionStorage.clear()
        localStorage.removeItem("isLoggedIn")
        navigate('/') //navega pra tela de bem vindo
    }
  
    return (
    <div>
        <div className="flex flex-row p-2">
            <span className="text-4xl mx-auto font-lato-bold">{text}</span>
            <div className="flex flex-row gap-2">
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <div className='bg-gray-400/50 w-40 h-12 rounded-md flex gap-4 p-2 justify-center items-center'>
                            <img src={userPfp} className="w-8 h-8 rounded-[50%]"/> 
                            <span className="font-lato-bold text-black text-center" >{user}</span>
                        </div>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                        list: {
                            'aria-labelledby': 'basic-button',
                        },
                        }}>
                        <MenuItem onClick={navPerfil}><span className='text-black font-lato-bold'>Perfil</span></MenuItem>
                        <MenuItem onClick={navConfig}><span className='text-black font-lato-bold'>Configurações</span></MenuItem>
                        <MenuItem onClick={Logout}><span className='text-red-500 font-lato-bold'>Sair</span></MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    </div>
  )
}