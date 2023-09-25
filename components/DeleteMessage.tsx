import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
    champion: string,
    id: number,
    type: string
}


function DeleteMessage({id, type, champion}: Props) {



  return (
    <button>
        <TrashIcon className='w-12 h-12 text-white'/>
    </button>
  )
}

export default DeleteMessage