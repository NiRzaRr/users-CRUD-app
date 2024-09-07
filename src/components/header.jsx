import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <ul className="flex justify-center">
        <Link to='/'><li className="font-bold group text-xl text-yellow-100" >HOME
        <span className="block w-0 group-hover:w-full bg-white h-0.5 transition-all duration-300" ></span></li></Link>
    </ul>
  )
}

export default Header