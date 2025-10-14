import React from 'react'

export default function BotoesPopup({trocarComponente}) {
  return (
    <div className="bg-white-div rounded-3xl h-[50%] w-[40%] fixed z-2 top-1/4 left-[30%] grid grid-cols-2 gap-2 p-3 font-lato-bold text-2xl text-black">
        <button onClick={() => trocarComponente('NovaCategoria')} className="bg-[#DEDCFF] justify-center items-center rounded-2xl hover:cursor-pointer">+ Categoria</button>
        <button onClick={() => trocarComponente('NovaDespesa')} className="bg-[#FFD0D0] justify-center items-center rounded-2xl hover:cursor-pointer">+ Despesa</button>
        <button onClick={() => trocarComponente('NovaReceita')} className="bg-[#D1FAE5] justify-center items-center rounded-2xl hover:cursor-pointer">+ Receita</button>
        <button onClick={() => trocarComponente('NovaMeta')} className="bg-[#FFEED9] justify-center items-center rounded-2xl hover:cursor-pointer">+ Meta</button>
    </div>
  )
}
