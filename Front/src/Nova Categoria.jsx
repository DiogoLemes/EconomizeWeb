import React, { useState } from 'react'
import { useContext } from "react"
import { AuthContext } from "./UserContext"

export default function NovaCategoria({onClose}) {

  const {user, setUser, id, setId, email, setEmail, userPfp, setUserPfp} = useContext(AuthContext)
  
  const [categoriaReceita, setCategoriaReceita] = useState(false)
  const [categoriaDespesa, setCategoriaDespesa] = useState(false)
  const classeReceitaInativa = "bg-receita-button-inactive p-2 rounded-xl w-30 hover:cursor-pointer hover:bg-receita-button-active"
  const classeReceitaAtiva = "bg-receita-button-active p-2 rounded-xl w-30 hover:cursor-pointer"
  const classeDespesaInativa = "bg-despesa-button-inactive p-2 rounded-xl w-30 hover:cursor-pointer hover:bg-despesa-button-active"
  const classeDespesaAtiva = "bg-despesa-button-active p-2 rounded-xl w-30 hover:cursor-pointer"

  function TipoCategoriaAtual(tipo) {
    if(tipo == "Despesa"){
      setCategoriaReceita(false)
      setCategoriaDespesa(true)
    }
    else {
      setCategoriaReceita(true)
      setCategoriaDespesa(false)
    }
  }

  const [categoriaNome, setCategoriaNome] = useState("")
  function submitCategoria(){
    console.log("Nome: " + categoriaNome)

    const categoriaTipo = categoriaReceita ? "Receita" : "Despesa"

    const novaCategoriaData = {
      usuario_id: id,
      nome: categoriaNome,
      tipo: categoriaTipo,
      //icone: sla ainda
    }

    fetch(`http://localhost:3000/categories/${id}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaCategoriaData)
    }).then(res => {
        if(!res.ok) {
          //console.log(res)
          return
        }

        return res.json()
      })

    if(localStorage.getItem("empty dashboard") == true) {
      localStorage.setItem("empty dashboard", false) //avisa o dash que não está mais vazio
    }

    onClose()
  }
  
  return (
    <div>
      <div className="bg-white-div rounded-4xl h-[50%] w-[40%] fixed z-2 top-1/4 left-[30%] p-3 text-black">
        <div className="bg-theme-light font-lato-bold text-2xl rounded-3xl w-[100%] h-[100%]">
          <div className=' flex flex-row h-[100%] justify-center'>
            <form className="w-[50%]">
              <div className="flex flex-col p-4 gap-2">
                <span className="text-start">Nova Categoria:</span>
                <input  type="text" 
                        value={categoriaNome} 
                        onChange={(e) => setCategoriaNome(e.target.value)} 
                        placeholder="Nome da Categoria"
                        className="bg-white rounded-md border-2 border-input-border text-[1.2rem] h-8 font-lato-regular outline-none my-4 p-1"/>
                <div className="font-lato-regular text-xl text-start mb-6">
                  <span className="text-[1rem]">Tipo de Categoria:</span>
                  <div className=" flex justify-items-start gap-4 mt-4">
                    <input type="button" value="Despesa" onClick={() => TipoCategoriaAtual("Despesa")} className={categoriaDespesa ? classeDespesaAtiva : classeDespesaInativa} /> 
                    <input type="button" value="Receita" onClick={() => TipoCategoriaAtual("Receita")} className={categoriaReceita ? classeReceitaAtiva : classeReceitaInativa} /> 
                  </div>
                </div>
                <button type="button" onClick={() => submitCategoria()} className="bg-sidebar-selected-text text-white-text p-2 rounded-xl font-lato-regular text-xl w-[60%] hover:cursor-pointer">Criar Categoria</button>
              </div>
            </form>
            <div className="p-4 w-[40%] flex flex-col">
              <span className="text-[1rem] text-start py-2">Ícone da categoria:</span>
              <div className="rounded-2xl bg-white-div h-[80%] w-[100%]">
                {/* botar um grid pros icones (checkmark boxes?) */}
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}
