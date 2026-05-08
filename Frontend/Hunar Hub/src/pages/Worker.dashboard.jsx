// src/pages/WorkerDashboard.jsx
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../utils/axios"

export default function WorkerDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])
  const [worker, setWorker] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Protected + worker-only route
  useEffect(() => {
    if (!user) navigate("/login")
    if (user?.role !== "worker") navigate("/")
  }, [])

  useEffect(() => {
    fetchWorkerData()
    fetchBookings()
  }, [])

  // Worker profile fetch
  const fetchWorkerData = async () => {
    try {
      const res = await api.get(`/worker/getWorker/${user?.id}`)
      // Note: getWorker workerId se fetch karta hai
      // Agar tumhare paas /worker/me jaisa route ho toh better hai
      setWorker(res.data.worker)
    } catch (err) {
      console.log(err)
    }
  }

  // Bookings fetch — worker ke liye
  const fetchBookings = async () => {
    try {
      setLoading(true)
      const res = await api.get("/booking/workerBookings")
      setBookings(res.data.booking || [])
    } catch (err) {
      setError(err.response?.data?.message || "Bookings load nahi hue")
    } finally {
      setLoading(false)
    }
  }

  // Accept / Reject / Complete
  const handleStatus = async (bookingId, status) => {
    try {
      await api.patch(`/worker/update/${bookingId}`, { status })
      setBookings(prev =>
        prev.map(b => b._id === bookingId ? { ...b, status } : b)
      )
    } catch (err) {
      alert(err.response?.data?.message || "Update nahi hua")
    }
  }

  // Availability toggle
  const handleToggle = async () => {
    try {
      await api.patch("/worker/toggle")
      setWorker(prev => ({ ...prev, isAvailable: !prev.isAvailable }))
    } catch (err) {
      alert("Toggle nahi hua")
    }
  }

  const handleLogout = async () => {
    try { await api.post("/user/logout") } catch {}
    logout()
    navigate("/login")
  }

  // Stats
  const total     = bookings.length
  const pending   = bookings.filter(b => b.status === "pending").length
  const accepted  = bookings.filter(b => b.status === "accepted").length
  const completed = bookings.filter(b => b.status === "completed").length

  const statusStyle = {
    pending:   "bg-yellow-100 text-yellow-700",
    accepted:  "bg-green-100 text-green-700",
    rejected:  "bg-red-100 text-red-700",
    completed: "bg-gray-100 text-gray-600",
    cancelled: "bg-gray-100 text-gray-500",
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-medium text-lg">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">
              {worker?.skills?.[0]} · {worker?.area}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Availability Toggle */}
          <button
            onClick={handleToggle}
            className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
              worker?.isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-500"
            }`}
          >
            {worker?.isAvailable ? "Available" : "Unavailable"}
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { label: "Total",     value: total,     color: "text-gray-900" },
          { label: "Pending",   value: pending,   color: "text-yellow-600" },
          { label: "Accepted",  value: accepted,  color: "text-green-600" },
          { label: "Completed", value: completed, color: "text-gray-500" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-xl font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Worker Info */}
      {worker && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5">
          <p className="font-medium text-gray-800 mb-3">Worker Profile</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-400 text-xs mb-1">Skills</p>
              <div className="flex flex-wrap gap-1">
                {worker.skills?.map(s => (
                  <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Rate per day</p>
              <p className="font-medium text-gray-800">₹{worker.ratePerDay}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Experience</p>
              <p className="font-medium text-gray-800">{worker.experience} yrs</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Rating</p>
              <p className="font-medium text-gray-800">
                {worker.rating > 0 ? `${worker.rating} / 5` : "No ratings yet"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bookings */}
      <p className="font-medium text-gray-800 mb-3">Incoming Bookings</p>

      {loading && (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse h-28" />
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && bookings.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>Koi booking nahi aayi abhi</p>
        </div>
      )}

      <div className="space-y-3">
        {bookings.map(booking => (
          <div key={booking._id} className="bg-white rounded-xl border border-gray-100 p-4">

            {/* User info + status */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
                  {booking.userId?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">
                    {booking.userId?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {booking.address} · {new Date(booking.date).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle[booking.status]}`}>
                {booking.status}
              </span>
            </div>

            {/* Description */}
            {booking.description && (
              <p className="text-sm text-gray-500 mt-3 pt-3 border-t border-gray-50">
                {booking.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              {booking.status === "pending" && (
                <>
                  <button
                    onClick={() => handleStatus(booking._id, "accepted")}
                    className="text-xs text-green-600 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-50"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatus(booking._id, "rejected")}
                    className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50"
                  >
                    Reject
                  </button>
                </>
              )}
              {booking.status === "accepted" && (
                <button
                  onClick={() => handleStatus(booking._id, "completed")}
                  className="text-xs text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
                >
                  Mark Complete
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}