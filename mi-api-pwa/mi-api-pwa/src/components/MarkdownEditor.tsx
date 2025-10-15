import { useState } from 'react'
import type { NotaProps } from '../types'
import ReactMarkdown from 'react-markdown';

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
            <div className='fixed inset-0 bg-gray-400/40 flex items-center justify-center p-4'>
                <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl'>
                    <input
                        className='text-2xl font-bold mb-4 focus:ring-0 outline-none w-full'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className='mb-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700' >
                        {isEditing ? 'Ver' : 'Editar'}
                    </button>
                    {
                        isEditing ? (
                            <textarea
                                className='w-full h-96 p-2 rounded focus:ring-0 outline-none resize-none'
                                value={contenido}
                                onChange={(e) => setContenido(e.target.value)}
                            />
                        ) : (
                            <div className='prose'>
                                <ReactMarkdown components={{
                                    h1: ({ node, ...props }) => <h1 className="text-4xl font-bold my-4" {...props} />,
                                    p: ({ node, ...props }) => <p className="text-base mb-4" {...props} />,
                                    a: ({ node, ...props }) => <a className="text-blue-600 underline hover:text-blue-800" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
                                }}>{contenido}</ReactMarkdown>
                            </div>
                        )
                    }
                    <div className='flex justify-end gap-4 mt-4'>
                        <button onClick={onClose} className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300'>Cancelar</button>
                        <button onClick={handleGuardar} className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700'>Guardar y Cerrar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarkdownEditor