import React from 'react'

export default function BotoesPopup({TrocarComponente}) {
  return (
    <div className="bg-white-div rounded-3xl h-[50%] w-[40%] fixed z-2 top-1/4 left-[30%] grid grid-cols-2 gap-2 p-3 font-lato-bold text-2xl text-black">
        <button onClick={() => TrocarComponente('NovaCategoria')} className="bg-categoria-bg justify-center items-center rounded-2xl hover:cursor-pointer">+ Categoria</button>
        <button onClick={() => TrocarComponente('NovaDespesa')} className="bg-despesa-bg justify-center items-center rounded-2xl hover:cursor-pointer">+ Despesa</button>
        <button onClick={() => TrocarComponente('NovaReceita')} className="bg-receita-bg justify-center items-center rounded-2xl hover:cursor-pointer">+ Receita</button>
        <button onClick={() => TrocarComponente('NovaMeta')} className="bg-meta-bg justify-center items-center rounded-2xl hover:cursor-pointer">+ Meta</button>
    </div>
  )
}
