import {NavLink} from 'react-router-dom'
import logo from '../assets/mainLogo.png'

const Navbar = () => {
  return (
    <>
      
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <NavLink to="/" className="flex items-center">
      <img src={logo} className="h-12 	filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05)); mr-3" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BookBoon</span>
  </NavLink>
  <NavLink to="/post" className="text-white">Post</NavLink>
  </div>
</nav>

    </>
  )
}

export default Navbar
