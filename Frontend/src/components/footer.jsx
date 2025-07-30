import React from 'react'

function Footer() {
  return (
    <div>
           <footer className="bg-gray-900 text-white py-12 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <i className="fas fa-sticky-note text-2xl text-blue-400 mr-3"></i>
              <h3 className="text-2xl font-bold">NotesApp</h3>
            </div>
            <p className="text-gray-400 mb-8">
              The simplest way to capture and organize your thoughts
            </p>
            <div className="flex items-center justify-center space-x-6">
              <i className="fab fa-twitter text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"></i>
              <i className="fab fa-github text-gray-400 hover:text-white cursor-pointer transition-colors"></i>
              <i className="fab fa-linkedin text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer