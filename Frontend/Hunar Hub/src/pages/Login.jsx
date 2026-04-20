import { useState } from "react"
import { Link ,useNavigate} from "react-router-dom"
import api from "../utils/axios"
import { useAuth } from "../context/AuthContext"


function Login() {
  const {login}=useAuth()
  const navigate=useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Backend API call yahan aayegi baad mein

    if(!email || !password)
    {
      setError("Please fill all fields")
      return
    }

    try {
      setLoading(true);
      const res=await api.post("/user/login",{email,password})

      if(res.data.success)
      {
        alert("Login successfully")
        login(res.data.userData) 
      navigate("/")
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    }
    finally{
      setLoading(false)
    }

  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">🔧 HunarHub</h1>
          <p className="text-gray-500 mt-1 text-sm">Welcome back! Please sign in</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 text-sm mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login