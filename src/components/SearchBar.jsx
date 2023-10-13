import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const SearchBar = ({ searchBarActive, setSearchBarActive, searchBarInput, setSearchBarInput, fetchMovies }) => {
  const handleKeyPressed = (e) => {
    if (searchBarInput === '') {
      return
    }
    if (e.key === 'Enter') {
      toggleSearchBar()
      e.target.value = ''
      fetchMovies(searchBarInput)
      scrollToTop()
    }
  }

  const handleIconPressed = () => {
    if (searchBarInput === '') {
      return
    }
    fetchMovies(searchBarInput)
    toggleSearchBar()
    scrollToTop()
  }

  const toggleSearchBar = () => {
    setSearchBarActive((prev) => !prev)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className={`flex fixed inset-0 z-50  items-start justify-center pt-16 sm:pt-24`}>
        <div className='relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100 z-10'>
          <div className='overflow-hidden rounded-lg bg-white shadow-md'>
            <div className='relative'>
              <input
                value={searchBarInput}
                className='block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6'
                placeholder='Avengers, Interestellar, Ratatouille...'
                onChange={(e) => setSearchBarInput(e.target.value)}
                onKeyDown={handleKeyPressed}
                autoFocus={true}
              />
              <MagnifyingGlassIcon
                className='cursor-pointer absolute right-4 top-4 h-6 w-6 text-gray-400'
                onClick={handleIconPressed}
              />
            </div>
          </div>
        </div>
        <div
          className='fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100 z-0'
          onClick={toggleSearchBar}></div>
      </div>
    </>
  )
}

export default SearchBar
