import { useState } from 'react'
import type { NotaProps } from '../types'
import ReactMarkdown from 'react-markdown';
import markdownComponents from './MarkdownStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const MarkdownEditor = ({ nota, onClose, onSave }: { nota: NotaProps; onClose: () => void; onSave: (id: number, nuevoTitulo: string, nuevoTexto: string) => void }) => {

    const [contenido, setContenido] = useState(nota.texto);
    const [titulo, setTitulo] = useState(nota.titulo);
    const [isEditing, setIsEditing] = useState(false);

    const handleGuardar = () => {
        onSave(nota.id, titulo, contenido);
        onClose();
    }

    return (
        <>
            <div className='fixed inset-0 bg-gray-400/40 flex items-center justify-center p-2 sm:p-6'>
                <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl sm:max-h-[90vh] flex flex-col overflow-hidden'>
                    <div className='flex items-center gap-3 p-4 sm:p-6'>
                        <input
                            className='text-xl sm:text-2xl font-bold flex-1 mb-4 focus:ring-0 outline-none w-full border-b sm:border-b-0 pb-1 sm:pb-0'
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className='mb-4 px-4 py-2 rounded bg-white text-gray-400 hover:text-gray-600 transition ease-in-out duration-200' >
                            {isEditing ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faPenToSquare} />}
                        </button>
                    </div>
                    {
                        isEditing ? (
                            <textarea
                                className='w-full h-[45vh] sm:h-96 p-4 sm:p-6 pt-2 rounded focus:ring-0 outline-none resize-none'
                                value={contenido}
                                onChange={(e) => setContenido(e.target.value)}
                            />
                        ) : (
                            <div className='prose max-h-[45vh] sm:max-h-96 overflow-y-auto pt-4 sm:pt-6 px-4 sm:px-6'>
                                <ReactMarkdown components={markdownComponents}>{contenido}</ReactMarkdown>
                            </div>
                        )
                    }
                    <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 p-4 sm:p-6'>
                        <button onClick={onClose} className='w-full sm:w-auto px-4 py-2 rounded bg-gray-200 hover:bg-gray-300'>Cancelar</button>
                        <button onClick={handleGuardar} className='w-full sm:w-auto px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700'>Guardar y Cerrar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarkdownEditor