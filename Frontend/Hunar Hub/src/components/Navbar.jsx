import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const isLoggedIn = false // baad mein logic aayega
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">
            🔧
          </div>
          <span className="text-xl font-extrabold text-gray-900">
            Hunar<span className="text-blue-600">Hub</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/workers" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Find Workers
          </Link>
          <Link to="/chat" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            🤖 AI Assistant
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                  K
                </div>
                Profile
              </Link>
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-red-500 hover:text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 border border-gray-200 px-4 py-2 rounded-lg hover:border-blue-300 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2 border-b border-gray-50"
          >
            🏠 Home
          </Link>
          <Link
            to="/workers"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2 border-b border-gray-50"
          >
            👷 Find Workers
          </Link>
          <Link
            to="/chat"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2 border-b border-gray-50"
          >
            🤖 AI Assistant
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 py-2 border-b border-gray-50"
              >
                👤 Profile
              </Link>
              <button className="text-sm font-medium text-red-500 text-left py-2">
                🚪 Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center text-sm font-medium text-gray-700 border border-gray-200 px-4 py-2.5 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center text-sm font-medium text-white bg-blue-600 px-4 py-2.5 rounded-lg"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
