// src/pages/UserDashboard.jsx
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../utils/axios"

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Protected route
  useEffect(() => {
    if (!user) navigate("/login")
  }, [])

  // Bookings fetch
  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const res = await api.get("/booking/myBooking")
      console.log(res.data)
      setBookings(res.data.booking)
    } catch (err) {
      setError(err.response?.data?.message || "Bookings load nahi hue")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Kya sach mein cancel karna hai?")) return
    try {
      await api.patch(`/booking/cancel/${bookingId}`)
      // Local state update — dobara fetch na karo
      setBookings(prev =>
        prev.map(b =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      )
    } catch (err) {
      alert(err.response?.data?.message || "Cancel nahi hua")
    }
  }

  const handleLogout = async () => {
    try {
      await api.post("/user/logout")
      logout()
      navigate("/login")
    } catch {
      logout()
      navigate("/login")
    }
  }

  // Stats
  const total = bookings.length
  const pending = bookings.filter(b => b.status === "pending").length
  const confirmed = bookings.filter(b => b.status === "confirmed").length

  // Status badge color
  const statusStyle = {
    pending:   "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium text-lg">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-50"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total", value: total, color: "text-gray-900" },
          { label: "Pending", value: pending, color: "text-yellow-600" },
          { label: "Confirmed", value: confirmed, color: "text-green-600" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Bookings */}
      <p className="font-medium text-gray-800 mb-3">My Bookings</p>

      {loading && (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse h-24" />
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && bookings.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">Koi booking nahi mili</p>
          <button
            onClick={() => navigate("/")}
            className="mt-3 text-blue-600 text-sm underline"
          >
            Worker dhundho
          </button>
        </div>
      )}

      <div className="space-y-3">
        {bookings.map(booking => (
          <div key={booking._id} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium text-sm">
                  {booking.worker?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{booking.worker?.name}</p>
                  <p className="text-xs text-gray-500">
                    {booking.worker?.skill} · {booking.worker?.area}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle[booking.status]}`}>
                {booking.status}
              </span>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              <p className="text-xs text-gray-400">
                {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric"
                })}
              </p>
              {booking.status === "pending" && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="text-xs text-red-500 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}