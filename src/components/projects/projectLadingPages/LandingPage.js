import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <section className="w-[90%] mx-auto flex flex-col gap-4 mt-36 p-4 items-center justify-center">
    <Link
      to="/projects"
      className="bg-blue-500 w-[80%] sm:w-[40%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
    >
      Mantenimientos
    </Link>
    <Link
      to="/landaudit"
      className="bg-blue-500 w-[80%] sm:w-[40%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
    >
      Auditoria de tierras
    </Link>
  </section>
  )
}

export default LandingPage