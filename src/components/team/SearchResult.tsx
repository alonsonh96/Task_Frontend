import type { TeamMember } from '@/types/index'
import React from 'react'

type SearchResultProps = {
    user: TeamMember
}

export const SearchResult = ({ user }: SearchResultProps) => {

  const { name, email, _id } = user

  return (
    <>
        <p className='mt-10 text-center font-bold'>Resultado:</p>
        <div className='flex justify-between items-center'>
            <p className='font-bold'>Usuario : <span className='font-normal'>{name}</span></p>
            <button className='bg-slate-700 text-white hover:bg-slate-600 px-10 py-3 font-bold cursor-pointer rounded-md'>
                Agregar al proyecto
            </button>
        </div>
    </>
  )
}
