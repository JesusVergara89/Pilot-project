import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <section className="w-[90%] mx-auto flex mt-20 p-4 items-center justify-center space-x-4">
    <Link
      to="/projects"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
    >
      Maintenance
    </Link>
    <Link
      to="/landaudit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
    >
      Land audit
    </Link>
  </section>
  )
}

export default LandingPage