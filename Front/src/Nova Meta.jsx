import React from 'react'
import { useState } from "react"
import { useContext } from "react"
import {AuthContext} from "./UserContext"

export default function NovaMeta() {

  const {user, setUser, id, setId, email, setEmail} = useContext(AuthContext)
  
  const tipoMetaInativo = "bg-[#FFD29D] p-2 rounded-xl w-30 hover:cursor-pointer hover:bg-[#FFB151]"
  const tipoMetaAtivo = "bg-[#FFB151] p-2 rounded-xl w-30 hover:cursor-pointer"
  const valorMetaClasse = "bg-white-div rounded-md border-2 border-[#B3B3B3] text-[1.2rem] h-8 lato-regular outline-none my-4 p-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0"
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

    setTipoMeta(estado)
  }
  
  function FuncaoTeste(){
    const nomeMeta = document.getElementById("nomeMeta")
    const tipoCategoriaMeta = tipoMeta
    const dataPrazoMeta = document.getElementById("dataPrazoMeta")
    const boolSemPrazoMeta = document.getElementById("boolSemPrazoMeta")
    const valorMeta = document.getElementById("valorMeta")

    console.log("data prazo meta: " + dataPrazoMeta.value)
    const dataPrazoFinal = dataPrazoMeta.valueAsDate
    console.log(dataPrazoFinal.toISOString())
    const AAAA = new Date(dataPrazoFinal)
    console.log(AAAA)
    const dataCriacaoMeta = new Date()
    console.log(dataCriacaoMeta)

    //criar tipo data, enviar dados pra api, e pegar metas no fetch da tela investimentos
  }

  return (
    <div>
        <div className="bg-white-div rounded-4xl h-[50%] w-[40%] fixed z-2 top-1/4 left-[30%] p-3 text-black"> {/* tela de categoria */}
          <div className="bg-[#FFEED9] font-lato text-2xl rounded-3xl w-[100%] h-[100%] flex">
            <div className="flex flex-col">
              <span className="ml-5 mt-5 text-start">Nova Meta:</span>
              <form className="w-[65%] align-middle ml-[15%] h-[100%]">
                <div className="flex flex-col p-2 gap-2">
                  <input id="nomeMeta" type="text" placeholder="Nome da Meta"
                  className="bg-white rounded-md border-2 border-[#B3B3B3] text-[1.2rem] h-8 lato-regular outline-none my-4 p-1"/>
                  <div className="lato-regular text-[1rem] text-start mb-2">
                    <span className="">Tipo da Meta:</span>
                    <div className=" flex justify-items-start gap-4 my-4">
                      <input type="button" value="Poupança" onClick={() => TipoMetaAtual(1)} className={`${metaPoupanca ? tipoMetaAtivo : tipoMetaInativo}`}/> 
                      <input type="button" value="Compra" onClick={() => TipoMetaAtual(2)} className={`${metaCompra ? tipoMetaAtivo : tipoMetaInativo}`} /> 
                      <input type="button" value="Viagem" onClick={() => TipoMetaAtual(3)} className={`${metaViagem ? tipoMetaAtivo : tipoMetaInativo}`} /> 
                      <input type="button" value="Emergência" onClick={() => TipoMetaAtual(4)} className={`${metaEmergencia ? tipoMetaAtivo : tipoMetaInativo}`} /> 
                    </div>
                    <div className='flex flex-row w-100%'>
                      <span className='my-auto'>Prazo: </span>
                      <input id="dataPrazoMeta" type="date" className="ml-2 bg-white-div rounded-md border-2 border-[#B3B3B3] text-[1.2rem] h-8 lato-regular outline-none my-4 p-1"/>
                      <input id="boolSemPrazoMeta" type='checkbox' className='ml-2 bg-white-div rounded-md border-2 border-[#B3B3B3] text-[1.2rem] h-8 lato-regular outline-none my-4 p-1 w-5'/>
                      <span className='my-auto ml-2'>Sem prazo</span>
                    </div>
                    <input id="valorMeta" type="number" pattern="\d*" placeholder="Valor (R$)" className={valorMetaClasse}/>
                  </div>
                  {/* <button onClick={() => console.log('teste')} className="bg-[#FFB151] text-black p-2 rounded-md lato-bold text-xl w-[60%] hover:cursor-pointer">Criar Meta</button> */}
                  <input type='button' value="Criar Meta" onClick={() => FuncaoTeste()} className="bg-[#FFB151] text-black p-2 rounded-md lato-bold text-xl w-[60%] hover:cursor-pointer"></input>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}
