'use client'
import { useEffect, useState } from 'react'

import axios from 'axios'
import YouTube from 'react-youtube'
import Image from 'next/image'

// components
import SearchBar from '@/components/SearchBar'
import NavBar from '@/components/NavBar'

// icons
import { PlayCircleIcon } from '@heroicons/react/24/outline'

// constants
import { CONSTANTS } from '@/constants/constants'
const { API_URL, API_KEY, IMAGE_PATH, URL_IMAGE } = CONSTANTS

export default function Home() {
  const [searchBarActive, setSearchBarActive] = useState(false)
  const [searchBarInput, setSearchBarInput] = useState('')

  const [movies, setMovies] = useState([])
  const [trailer, setTrailer] = useState(null)
  const [movie, setMovie] = useState({ title: 'Loading Movies' })
  const [isPlaying, setIsPlaying] = useState(false)

  // get all movies
  const fetchMovies = async () => {
    const type = searchBarInput !== '' ? 'search' : 'discover'
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchBarInput,
      },
    })
    setMovies(results)
    setMovie(results[0])

    if (results.length) {
      await fetchMovieVideo(results[0].id)
    }
  }

  // get single movie and show its trailer
  const fetchMovieVideo = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'videos',
      },
    })

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find((video) => video.name === 'Official Trailer')
      setTrailer(trailer ? trailer : data.videos.results[0])
    }
    setMovie(data)
  }

  const selectMovieVideo = async (movie) => {
    await fetchMovieVideo(movie.id)
    setMovie(movie)
    scrollToTop()
  }

  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* --Header */}
      <header>
        <NavBar setSearchBarActive={setSearchBarActive} setSearchBarInput={setSearchBarInput} searchBarInput={searchBarInput} />
      </header>

      {/* --Body content */}
      <div className='mt-20'>
        {/* -- --Banner and trailer container */}
        <div>
          {movie ? (
            <div
              className='flex justify-center items-end min-h-[700px] bg-cover bg-center p-10 text-black mb-10'
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url('${IMAGE_PATH}${movie.backdrop_path}')`,
              }}>
              {isPlaying ? (
                <>
                  <div className='flex flex-col w-full m-auto items-end'>
                    <YouTube
                      videoId={trailer?.key}
                      className='w-[100%] md:w-[60%] h-[500px] m-auto my-4'
                      containerClassName={'youtube-container amru'}
                      opts={{
                        width: '100%',
                        height: '100%',
                        playerVars: {
                          autoplay: 1,
                          controls: 1,
                          cc_load_policy: 0,
                          fs: 1,
                          iv_load_policy: 0,
                          modestbranding: 1,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                    <button
                      onClick={() => setIsPlaying(false)}
                      className='bg-[#0f1014] w-32 my-8 text-[#FFFC00] outline-none border border-solid border-white p-2 cursor-pointer mb-4 mx-auto justify-self-end rounded-md'>
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <div className='grid mx-[5%] md:mx-[10%] xl:mx-[15%]'>
                  <h1 className='text-white text-4xl my-4'>{movie.title}</h1>
                  <p className='text-white text-sm my-4'>{movie.overview}</p>
                  {trailer ? (
                    <>
                      <button
                        type='button'
                        onClick={() => setIsPlaying(true)}
                        className='bg-[#0f1014] w-36 text-[#FFFC00] outline-none border border-solid border-white p-2 cursor-pointer mb-4 mx-auto justify-self-end rounded-md'>
                        Play Trailer
                      </button>
                    </>
                  ) : movie.title !== 'Loading Movies' ? (
                    "Sorry, there's no trailer available"
                  ) : null}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* -- --Movies container */}
        <main className=' mx-[15%] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden z-0 cursor-pointer rounded-lg '>
          {movies.map((movie) => (
            <div key={movie.id} className='relative overflow-hidden bg-cover bg-no-repeat rounded-lg'>
              <div className='relative overflow-hidden bg-cover bg-no-repeat rounded-lg'>
                <Image
                  className='w-full opacity-100 rounded-lg'
                  src={`${URL_IMAGE + movie.poster_path}`}
                  alt='movie poster'
                  width={600}
                  height={0}
                  priority
                />
                <div
                  onClick={() => selectMovieVideo(movie)}
                  className='absolute text-[#FFFC00] text-center justify-center align-middle bottom-0 left-0 right-0 top-0 h-auto w-full overflow-hidden bg-black/70 opacity-0 transition duration-300 ease-in-out hover:opacity-70'>
                  <PlayCircleIcon className='m-auto h-full' width={50} height={50} />
                </div>
              </div>
              <h4 className='text-center text-black z-20'>{movie.title}</h4>
            </div>
          ))}
        </main>

        {/* --Input popup */}
        {searchBarActive && (
          <SearchBar
            fetchMovies={fetchMovies}
            searchBarActive={searchBarActive}
            setSearchBarActive={setSearchBarActive}
            searchBarInput={searchBarInput}
            setSearchBarInput={setSearchBarInput}
          />
        )}
      </div>
    </>
  )
}
