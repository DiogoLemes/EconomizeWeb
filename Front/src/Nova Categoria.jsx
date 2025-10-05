import React from 'react'

export default function NovaCategoria() {
  return (
    <div className="">
        <div className="bg-black opacity-30 backdrop-blur-2xl w-screen h-screen fixed inset-0 z-1"/> {/* camada do blur do background */}
        <button onClick={() => console.log("clicou fechar")} className="text-4xl text-white fixed z-2 top-[20%] left-[75%]">
            <img src="\src\assets\botão fechar.png" alt="fechar" className="w-8 h-8"/>
        </button>
        <div className="bg-white-div rounded-4xl h-[50%] w-[50%] fixed z-2 top-1/4 left-1/4 p-3 text-black"> {/* tela de categoria */}
          <div className="bg-[#DEDCFF] lato-bold text-2xl rounded-3xl w-[100%] h-[100%] flex flex-row">
            <form className="w-[50%]">
                <div className="flex flex-col p-4 gap-2">
                  <span className="text-start">Nova Categoria:</span>
                  <input type="text" placeholder="Nome da Categoria"
                  className="bg-white rounded-md border-2 border-[#B3B3B3] text-xl lato-regular outline-none my-4"/>
                  <div className="lato-regular text-xl text-start mb-6">
                    <span className="text-[1rem]">Tipo de Categoria:</span>
                    <div className=" flex justify-items-start gap-4 mt-4">
                      <input type="button" value="Despesa" className="bg-[#FF4D4D] p-2 rounded-xl w-30 hover:cursor-pointer" /> 
                      <input type="button" value="Receita" className="bg-[#52C077] p-2 rounded-xl w-30 hover:cursor-pointer" /> 
                  </div>
                  </div>
                  <button className="bg-sidebar-selected-text text-white-div p-2 rounded-xl lato-regular text-xl w-[60%]">Criar Categoria</button>
                </div>
            </form>
            <div className="p-4 w-[40%]">
                <span className="text-[1rem]">Ícone da categoria</span>
                <div className="rounded-2xl bg-white-div h-[80%] w-[100%]">
                  {/* botar um map pros icones (inputs tipo botão?) */}
                </div>
            </div>
          </div>
          </div>
    </div>
  )
}
