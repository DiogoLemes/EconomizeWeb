import React from 'react'
import { useState } from 'react'

export default function NovaDespesa() {
  
  const botaoInativo = "bg-[#DB7A7A] p-2 rounded-xl w-30 hover:cursor-pointer"
  const botaoAtivo = "bg-[#FF4D4D] p-2 rounded-xl w-30 hover:cursor-pointer"
  
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
  
  return (
    <div>
        <div className="bg-white-div rounded-4xl h-[50%] w-[40%] fixed z-2 top-1/4 left-[30%] p-3 text-black"> {/* tela de categoria */}
          <div className="bg-[#FFD0D0] lato-bold text-2xl rounded-3xl w-[100%] h-[100%] flex">
            <div className="flex flex-col">
              <span className="ml-5 mt-5 text-start">Nova Despesa:</span>
              <form className="w-[60%] align-middle ml-[15%] h-[100%]">
                <div className="flex flex-col p-4 gap-2">
                  <input type="text" placeholder="Nome da Despesa"
                  className="bg-white rounded-md border-2 border-[#B3B3B3] text-[1.2rem] h-8 lato-regular outline-none my-4 p-1"/>
                  <input type="text" placeholder="Categoria da Despesa"
                  className="bg-white rounded-md border-2 border-[#B3B3B3] text-[1.2rem] h-8 lato-regular outline-none my-4 p-1"/>  {/* listar menu dropdown das categorias já cadastradas pelo usuário */}
                  <div className="lato-regular text-xl text-start mb-6">
                    <span className="text-[1rem]">Recorrente?</span>
                    <div className=" flex justify-items-start gap-4 mt-4">
                      <input type="button" value="Sim" onClick={() => toggleRecorrente(true)} className={`${recorrenteSim ? botaoAtivo : botaoInativo}`} /> 
                      <input type="button" value="Não" onClick={() => toggleRecorrente(false)} className={`${recorrenteNao ? botaoAtivo : botaoInativo}`} />
                      <span>A cada:</span>
                      <input type="number" size="5" 
                      className="bg-white rounded-md border-2 border-[#B3B3B3] text-[1.2rem] h-8 lato-regular outline-none my-4 p-1"/>
                      <input type="text" placeholder="Meses" size="6"
                      className="bg-white rounded-md border-2 border-[#B3B3B3] text-[1.2rem] h-8 lato-regular outline-none my-4 p-1"/> {/* menu dropdown igual o figma */}
                    </div>
                  </div>
                  <button className="bg-[#FF3C3C] text-black p-2 rounded-xl lato-regular text-xl w-[60%] hover:cursor-pointer">Criar Despesa</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}
