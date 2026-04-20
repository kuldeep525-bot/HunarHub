import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../utils/axios"

function Booking() {
  const { workerId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [worker, setWorker] = useState(null)
  const [date, setDate] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [workerLoading, setWorkerLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Login check karo
  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }
    fetchWorker()
  }, [])

  const fetchWorker = async () => {
    try {
      setWorkerLoading(true)
      const res = await api.get(`/worker/getWorker/${workerId}`)
      setWorker(res.data.worker)
    } catch (err) {
      console.log("Worker fetch nahi hua")
    } finally {
      setWorkerLoading(false)
    }
  }

  // Tumhara kaam — comment hata ke connect karo 😊
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!date || !address) {
      setError("Date aur address required hai")
      return
    }
    try {
      setLoading(true)
      const res = await api.post("/booking/create", {
        workerId,
        date,
        address,
        description,
      })
      if (res.data.success) {
        setSuccess(true)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Today ki date minimum
  const today = new Date().toISOString().split("T")[0]

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Tumhari booking send ho gayi hai. Worker jaldi accept karega!
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              My Bookings dekho →
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              Home pe jao
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Book a Worker</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in the details to confirm your booking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

              {/* Error */}
              {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 text-sm mb-4">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    📅 Booking Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => {
                      setDate(e.target.value)
                      setError("")
                    }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    📍 Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 123, Model Town, Ludhiana"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value)
                      setError("")
                    }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    📝 Description
                    <span className="text-gray-400 font-normal ml-1">(optional)</span>
                  </label>
                  <textarea
                    placeholder="e.g. Ghar ki wiring fix karni hai, 2 rooms mein..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Booking ho rahi hai...
                    </span>
                  ) : (
                    "Confirm Booking →"
                  )}
                </button>

              </form>
            </div>
          </div>

          {/* Right — Worker Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <h3 className="text-sm font-bold text-gray-700 mb-4">Booking Summary</h3>

              {workerLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
                      <div className="h-2 bg-gray-100 rounded w-16" />
                    </div>
                  </div>
                </div>
              ) : worker ? (
                <>
                  {/* Worker Info */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {worker.userId?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{worker.userId?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{worker.skills?.join(", ")}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    {[
                      ["📍", "Area", worker.area],
                      ["⭐", "Rating", worker.rating?.toFixed(1) || "New"],
                      ["🛠", "Experience", `${worker.experience} yrs`],
                    ].map(([icon, label, value]) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-gray-400">{icon} {label}</span>
                        <span className="font-medium text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-blue-400 mb-1">Rate per day</p>
                    <p className="text-2xl font-extrabold text-blue-600">₹{worker.ratePerDay}</p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">Worker info load ho rahi hai...</p>
              )}

              {/* Note */}
              <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-xl p-3">
                <p className="text-xs text-yellow-700">
                  ℹ️ Booking accept hone ke baad hi payment hogi. Free cancellation before acceptance.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Booking