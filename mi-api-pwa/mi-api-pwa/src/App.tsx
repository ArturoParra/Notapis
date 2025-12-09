import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import NotaCard from './components/NotaCard'
import type { NotaProps } from './types'
import MarkdownEditor from './components/MarkdownEditor'
import { useOnlineStatus } from './hooks/useOnlineStatus'
import { getApiUrl } from '../api/config'

function App() {

  const isOnline = useOnlineStatus()

  const [query, setQuery] = useState('')

  const [notas, setNotas] = useState<NotaProps[]>([ ])

  const [notaSeleccionada, setNotaSeleccionada] = useState<NotaProps | null>(null)

  const handleGuardar = (id: number, nuevoTitulo: string, nuevoTexto: string) => {
    setNotas(notas.map(nota => nota.id === id ? { ...nota, titulo: nuevoTitulo, texto: nuevoTexto } : nota))
  }

  const notasFiltradas = notas.filter(nota => nota.titulo.includes(query) || nota.texto.includes(query))

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const res = await fetch(getApiUrl('/api/notas'))
        if (!res.ok) throw new Error('Error al obtener las notas')
        const data = await res.json()
        setNotas(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchNotas()
  }, [])

  const handleCrearNota = async (titulo:String) => {
    try{
      const nuevaNota = { titulo: titulo, texto: '' }
      const res = await fetch(getApiUrl('/api/notas'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaNota)
      })
      if (!res.ok) throw new Error('Error al crear la nota')
      const data = await res.json()
      setNotas([...notas, data])
    }catch(error){
      console.error(error)
    }
  }

  const handleEliminar = (id: number) => {
    setNotas(prev => prev.filter(nota => nota.id !== id))
    setNotaSeleccionada(null)
  }

  return (
    <>
    {
      !isOnline && (
        <div className='bg-red-500 text-white text-center p-2'>
          Estás desconectado. Algunas funciones pueden no estar disponibles.
        </div>
      )
    }
      <div className='bg-gray-100 min-h-screen'>
        <div className='flex flex-col items-center justify-center h-fit p-10 bg-gray-100'>
          <form className='w-full flex justify-center' onSubmit={(e) => e.preventDefault()}>
            <div className='w-full md:w-1/2 p-5 border border-gray-300 rounded-lg shadow-md text-gray-300 bg-white flex items-center hover:shadow-lg hover:scale-102 transition duration-200 ease-in-out'>
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
                <>
                  <button
                    type='button'
                    className='ml-2 text-gray-400 hover:text-gray-600' onClick={() => setQuery('')}>
                    ×
                  </button>
                  <button
                    type='button'
                    className='ml-2 text-gray-400 hover:text-gray-600' onClick={() => {handleCrearNota(query), setQuery('')}}>
                    Crear Nota
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-between mx-10'>
          {
            notasFiltradas.length === 0 && (
              <p className='text-gray-500 col-span-full text-center'>No se encontraron notas.</p>
            )
          }
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
                onDelete={handleEliminar}
              />
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
