import React from 'react'
import { useState } from 'react'

export default function NovaDespesa({onClose}) {
  
  const botaoInativo = "bg-despesa-button-inactive p-2 rounded-xl w-30 hover:cursor-pointer hover:bg-despesa-button-active"
  const botaoAtivo = "bg-despesa-button-active p-2 rounded-xl w-30 hover:cursor-pointer"
  
  const [recorrenteSim, setRecorrenteSim] = useState(false)
  const [recorrenteNao, setRecorrenteNao] = useState(false)

  function toggleRecorrente(recorrente){
    if(recorrente){
      setRecorrenteSim(true)
      setRecorrenteNao(false)
    }
    else {
      setRecorrenteNao(true)
      setRecorrenteSim(false)
    }
  }

  function submitDespesa(){
    console.log("despesa criada")
  }
  
  return (
    <div>
        <div className="bg-white-div rounded-4xl h-[50%] w-[40%] fixed z-2 top-1/4 left-[30%] p-3 text-black"> {/* tela de categoria */}
            <div className="bg-despesa-bg font-lato-bold text-2xl rounded-3xl w-[100%] h-[100%] flex">
              <div className="flex flex-col justify-center self-center">
                <span className="ml-5 text-start">Nova Despesa:</span>
                <form className="w-[70%] align-middle mx-[auto] h-[90%]">
                  <div className="flex flex-col p-4">
                   <div className='flex flex-col gap-4'>
                      <input type="text" placeholder="Nome da Despesa"
                      className="bg-white rounded-md border-2 border-input-border 
                      text-[1.2rem] h-8 font-lato-regular outline-none p-1"/>
                      <select className="bg-white rounded-md border-2 border-input-border 
                      text-[1.2rem] h-8 font-lato-regular outline-none pl-1">
                        <option>Nome da Categoria</option> {/*testando se select é melhor que input customizado */}
                      </select>
                   </div>
                    <div className="font-lato-regular text-xl text-start mb-6">
                      <span className="text-[1rem]">Recorrente?</span>
                      <div className="flex w-[100%] justify-items-start gap-4 mt-4">
                        <input type="button" value="Sim" onClick={() => toggleRecorrente(true)} className={`${recorrenteSim ? botaoAtivo : botaoInativo}`} /> 
                        <input type="button" value="Não" onClick={() => toggleRecorrente(false)} className={`${recorrenteNao ? botaoAtivo : botaoInativo}`} />
                        <span className='w-[40%] my-auto'>A cada:</span>
                        <input type="number" size="5" 
                        className="bg-white rounded-md border-2 border-input-border text-[1.2rem] h-8 font-lato-regular outline-none my-4 p-1 w-[50%]"/>
                        <select className="bg-white rounded-md border-2 border-input-border text-[1.2rem] h-8 font-lato-regular outline-none my-4 pl-1">
                          <option>Dias</option>
                          <option>Semanas</option>
                          <option>Meses</option>
                        </select>
                      </div>
                      {/* Campo de valor e dropdown pra selecionar a meta */}
                      <div className="flex w-[100%] justify-items-start gap-4 mt-4">
                        <input type="text" placeholder="Valor"
                        className="bg-white rounded-md border-2 border-input-border text-[1.2rem] h-8 font-lato-regular outline-none my-4 p-1"/>
                        <select className="bg-white rounded-md border-2 border-input-border text-[1.2rem] h-8 font-lato-regular outline-none my-4 pl-1">
                          <option> Selecione a meta</option>
                          <option>Meta</option>
                        </select>
                      </div>
                      <button type="submit" onClick={() => submitdespesa()} className="bg-despesa-button-active text-black p-2 rounded-xl font-lato-regular text-xl w-[40%] hover:cursor-pointer">Criar despesa</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
    </div>
  )
}
