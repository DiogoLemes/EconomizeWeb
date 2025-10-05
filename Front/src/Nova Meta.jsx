import React from 'react'
import { useState } from "react"

export default function NovaMeta() {
  
  const tipoMetaInativo = "bg-[#FFD29D] p-2 rounded-xl w-30 hover:cursor-pointer hover:bg-[#FFB151]"
  const tipoMetaAtivo = "bg-[#FFB151] p-2 rounded-xl w-30 hover:cursor-pointer"
  const [tipoMeta, setTipoMeta] = useState(0)
  const [metaPoupanca, setMetaPoupanca] = useState(false)
  const [metaCompra, setMetaCompra] = useState(false)
  const [metaViagem, setMetaViagem] = useState(false)
  const [metaEmergencia, setMetaEmergencia] = useState(false)


  function TipoMetaAtual(estado){
    
    setTipoMeta(estado)
    if(estado == 1){
      setMetaPoupanca(true)
      setMetaCompra(false)
      setMetaViagem(false)
      setMetaEmergencia(false)
    }
    else if(estado == 2){
      setMetaPoupanca(false)
      setMetaCompra(true)
      setMetaViagem(false)
      setMetaEmergencia(false)
    }
    else if(estado == 3){
      setMetaPoupanca(false)
      setMetaCompra(false)
      setMetaViagem(true)
      setMetaEmergencia(false)
    }
    else if(estado == 4){
      setMetaPoupanca(false)
      setMetaCompra(false)
      setMetaViagem(false)
      setMetaEmergencia(true)
    }
    else {
      setMetaPoupanca(false)
      setMetaCompra(false)
      setMetaViagem(false)
      setMetaEmergencia(false)
    }
  }
  
  return (
    <div>
        <div className="bg-white-div rounded-4xl h-[50%] w-[40%] fixed z-2 top-1/4 left-[30%] p-3 text-black"> {/* tela de categoria */}
          <div className="bg-[#FFEED9] lato-bold text-2xl rounded-3xl w-[100%] h-[100%] flex">
            <div className="flex flex-col">
              <span className="ml-5 mt-5 text-start">Nova Meta:</span>
              <form className="w-[50%] align-middle ml-[15%] h-[100%]">
                <div className="flex flex-col p-2 gap-2">
                  <input type="text" placeholder="Nome da Meta"
                  className="bg-white rounded-md border-2 border-[#B3B3B3] text-[1.2rem] h-8 lato-regular outline-none my-4 p-1"/>
                  <div className="lato-regular text-[1rem] text-start mb-2">
                    <span className="">Tipo da Meta:</span>
                    <div className=" flex justify-items-start gap-4 my-4">
                      <input type="button" value="Poupança" onClick={() => TipoMetaAtual(1)} className={`${metaPoupanca ? tipoMetaAtivo : tipoMetaInativo}`}/> 
                      <input type="button" value="Compra" onClick={() => TipoMetaAtual(2)} className={`${metaCompra ? tipoMetaAtivo : tipoMetaInativo}`} /> 
                      <input type="button" value="Viagem" onClick={() => TipoMetaAtual(3)} className={`${metaViagem ? tipoMetaAtivo : tipoMetaInativo}`} /> 
                      <input type="button" value="Emergência" onClick={() => TipoMetaAtual(4)} className={`${metaEmergencia ? tipoMetaAtivo : tipoMetaInativo}`} /> 
                    </div>
                    <span>Prazo: </span>
                    <input type="date" className="ml-2 bg-white-div rounded-md border-2 border-[#B3B3B3] text-[1.2rem] h-8 lato-regular outline-none my-4 p-1"/>
                    <input type="text" placeholder="Valor" className="bg-white-div rounded-md border-2 border-[#B3B3B3] text-[1.2rem] h-8 lato-regular outline-none my-4 p-1"/>
                  </div>
                  <button onClick={() => console.log('teste')} className="bg-[#FFB151] text-black p-2 rounded-md lato-bold text-xl w-[60%] hover:cursor-pointer">Criar Meta</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}
