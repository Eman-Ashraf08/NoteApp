import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div>
            <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <i className="fas fa-sticky-note text-2xl text-blue-600 mr-3"></i>
              <h1 className="text-xl font-bold text-gray-900">NotesApp</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors">
              <button
                onClick={() => setCurrentPage("login")}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-colors rounded-lg whitespace-nowrap"
              >
                Sign In
              </button>
              </Link>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 transition-colors">
              <button
                className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors whitespace-nowrap"
              >
                Get Started
              </button>
              </Link>
            </div> 
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar