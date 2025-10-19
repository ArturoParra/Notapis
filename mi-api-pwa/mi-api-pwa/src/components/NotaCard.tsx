import React from 'react'
import type { NotaProps } from '../types'

const NotaCard: React.FC<NotaProps> = ({ id: _id, titulo, texto }) => {

    const MAX_LENGTH = 30

    const textoLimpio = texto.replace(/[#*`_~-]/g, '').trim()

    const textoCorto = textoLimpio.length > MAX_LENGTH ? textoLimpio.substring(0, MAX_LENGTH) + '...' : textoLimpio

    return (
        <>
            <div className='bg-white p-5 border border-white rounded-md m-2 shadow-md hover:shadow-lg hover:scale-102 transition duration-200 ease-in-out'>
                <p className='font-bold text-2xl'>{titulo}</p>
                <p className='text-gray-600 mt-2'>{textoCorto}</p>
            </div>
        </>
    )
}

export default NotaCard