import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import NotaCard from './components/NotaCard'
import type { NotaProps } from './types'
import MarkdownEditor from './components/MarkdownEditor'

function App() {

  const [query, setQuery] = useState('')

  const [notas, setNotas] = useState<NotaProps[]>([
    {
      id: 1,
      titulo: 'Nota',
      texto: '# Hola mundo\nEste es un texto en **Markdown**.'
    },
    {
      id: 2,
      titulo: 'Lista de compras',
      texto: '# Lista de compras\n- Leche\n- Pan\n- Huevos'
    },
    {
      id: 3,
      titulo: 'Clases',
      texto: '# Clases\nEste es un texto sobre las clases.'
    },
    {
      id: 4,
      titulo: 'Escuela',
      texto: '# Escuela\nEste es un texto sobre la escuela.'
    },
    {
      id: 5,
      titulo: 'Nota 2',
      texto: '# Nota 2\nEste es un texto sobre la nota 2.'
    },
    {
      id: 6,
      titulo: 'Escuela 2',
      texto: '# Escuela 2\nEste es un texto sobre la escuela 2.'
    },
    {
      id: 7,
      titulo: 'Nota de clase',
      texto: '# Nota de clase\nEste es un texto sobre la nota de clase.'
    },
  ])

  const [notaSeleccionada, setNotaSeleccionada] = useState<NotaProps | null>(null)

  const handleGuardar = (id: number, nuevoTitulo: string, nuevoTexto: string) => {
    setNotas(notas.map(nota => nota.id === id ? { ...nota, titulo: nuevoTitulo, texto: nuevoTexto } : nota))
  }

  const notasFiltradas = notas.filter(nota => nota.titulo.includes(query) || nota.texto.includes(query))

  return (
    <>
      <div className='bg-gray-100 min-h-screen'>
        <div className='flex flex-col items-center justify-center h-fit p-10 bg-gray-100'>
          <form className='w-full flex justify-center' onSubmit={(e) => e.preventDefault()}>
            <div className='w-1/2 p-5 border border-gray-300 rounded-lg shadow-md text-gray-300 bg-white flex items-center hover:shadow-lg hover:scale-102 transition duration-200 ease-in-out'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                type='text'
                className='flex-1 h-full bg-transparent ml-1 text-gray-700 placeholder:text-gray-400 outline-none'
                placeholder='Search...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setQuery('') }}
              />
              {query && (
                <button
                  type='button'
                  className='ml-2 text-gray-400 hover:text-gray-600' onClick={() => setQuery('')}>
                  ×
                </button>
              )}
            </div>
          </form>
        </div>
        <div className='grid grid-cols-4 gap-4 items-center justify-between mx-10'>
          {
            notasFiltradas.map(nota => (
              <div className='cursor-pointer' key={nota.id} onClick={() => setNotaSeleccionada(nota)}>
                <NotaCard
                  id={nota.id}
                  titulo={nota.titulo}
                  texto={nota.texto}
                />
              </div>
            ))
          }
          {
            notaSeleccionada && (
              <MarkdownEditor
                nota={notaSeleccionada}
                onClose={() => setNotaSeleccionada(null)}
                onSave={handleGuardar}
              />
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
