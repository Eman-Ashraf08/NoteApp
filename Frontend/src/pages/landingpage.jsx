import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";


const Landingpage = () => {
  return (
    <div className="relative z-10">
      <Navbar />
      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Capture Every
                <span className="block text-blue-600">Brilliant Idea</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your thoughts into organized, searchable notes. Add
                images, categorize with tags, and never lose track of your
                important ideas again.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 transition-colors">
              <button
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                Start Taking Notes
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
              </Link>
               <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
              <button
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 text-lg font-semibold rounded-xl border-2 border-gray-200 cursor-pointer transition-all duration-200 whitespace-nowrap"
              >
                Already have an account?
              </button>
              </Link>
            </div>
          </div>

          {/* Note UI Preview */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded"></div>
                  <div className="flex space-x-2">
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      work
                    </div>
                    <div className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      ideas
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-200 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to help you capture, organize, and find your
              notes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                <i className="fas fa-search text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Smart Search
              </h3>
              <p className="text-gray-600">
                Find any note instantly with our powerful search that looks
                through titles, content, and tags
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                <i className="fas fa-tags text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Tag Organization
              </h3>
              <p className="text-gray-600">
                Organize your notes with custom tags and filter by categories
                for quick access
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                <i className="fas fa-image text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Rich Media
              </h3>
              <p className="text-gray-600">
                Add images to your notes with simple drag and drop
                functionality
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Landingpage;
