import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import './index.css'

function App() {

  const [query, setQuery] = useState('')

  return (
    <>
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
            onKeyDown={(e) => {if(e.key === 'Escape') setQuery('')}}
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
    </>
  )
}

export default App
