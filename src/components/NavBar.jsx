import Link from 'next/link'
import Image from 'next/image'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/outline'

const NavBar = ({ setSearchBarActive, setSearchBarInput }) => {
  const handleSearchClick = () => {
    setSearchBarActive((prev) => !prev)
    setSearchBarInput('')
  }

  return (
    <nav className='flex w-full bg-[#111113] items-center fixed top-0 z-50 transition-transform transform translate-y-0'>
      <div className='flex w-2/3 sm:w-1/4 md:w-1/6 justify-center items-center p-4 mx-4 sm:mx-26 md:mx-28 lg:mx-40 xl:mx-60'>
        <Link href='/' className='flex justify-start items-center w-full gap-2'>
          <Image src='/assets/icons/chiteadas_darkmode_icon.svg' alt='Chiteadas logo' width={60} height={60} priority />
          <h1 className='text-[#FFFC00] text-2xl font-bold block'>Chiteadas</h1>
        </Link>
      </div>
      <div className='flex w-1/3 sm:w-3/4 md:w-5/6 justify-end items-center shadow-md'>
        <div className='flex gap-8 w-full mx-6 sm:mx-26 md:mx-28 lg:mx-40 xl:mx-60 h-full items-center justify-end'>
          <ul className='text-white gap-4 hidden md:flex'>
            <Link href='/'>Peliculas</Link>
            <Link href='/'>Series</Link>
          </ul>
          <MagnifyingGlassIcon className='cursor-pointer right-4 top-4 h-6 w-6 text-white' onClick={handleSearchClick} />
          <Bars3Icon className='cursor-pointer md:hidden right-4 top-4 h-6 w-6 text-white' />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
