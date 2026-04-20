import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../utils/axios"
import { useAuth } from "../context/AuthContext"



function WorkerDetail() {
  const { user } = useAuth()
  const { workerId } = useParams()
  const navigate = useNavigate()
  const [worker, setWorker] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  //api fetch
  useEffect(() => {
    fetchWorker()
    fetchReviews()
  }, [])

  const fetchWorker = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/worker/getWorker/${workerId}`)
      setWorker(res.data.worker)
     
      
    } catch (error) {
      setError("Worker not found")
      console.log(error)
    }finally{
      setLoading(false)
    }
  }





const fetchReviews = async () => {
  try {
    const res = await api.get(`/review/worker/${workerId}`)
    setReviews(res.data.reviews || [])
  } catch (err) {
    console.log("Reviews fetch nahi hue")
     setReviews([])
  }
}

  // Demo data 
  // const demoWorker = {
  //   _id: workerId,
  //   skills: ["electrician", "plumber"],
  //   area: "Ludhiana",
  //   experience: 3,
  //   ratePerDay: 800,
  //   rating: 4.5,
  //   totalReviews: 10,
  //   isAvailable: true,
  //   bio: "Main 3 saal se electrician ka kaam kar raha hoon. Ghar aur office dono ki wiring karta hoon. Fast aur reliable service deta hoon.",
  //   userId: {
  //     name: "Ramesh Kumar",
  //     email: "ramesh@gmail.com",
  //     phone: "9876543210",
  //   },
  // }

  // const demoReviews = [
  //   { _id: "1", rating: 5, comment: "Bahut achha kaam kiya! Time pe aaya aur kaam jaldi khatam kiya.", userId: { name: "Suresh" }, createdAt: "2024-01-15" },
  //   { _id: "2", rating: 4, comment: "Kaam theek tha, thoda late aaya lekin quality good thi.", userId: { name: "Priya" }, createdAt: "2024-01-10" },
  //   { _id: "3", rating: 5, comment: "Highly recommended! Professional kaam karta hai.", userId: { name: "Rahul" }, createdAt: "2024-01-05" },
  // ]

  const displayWorker = worker 
  const displayReviews = reviews || []

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}>
        ★
      </span>
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading worker profile...</p>
        </div>
      </div>
    )
  }

  if (!worker) return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <p className="text-4xl mb-4">😕</p>
      <p className="text-gray-500">Worker not found</p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        Go back home
      </button>
    </div>
  </div>
)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6"
        >
          ← Back to workers
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — Worker Info */}
          <div className="lg:col-span-2 space-y-4">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
                    {displayWorker.userId?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      {displayWorker.userId?.name}
                    </h1>
                    <p className="text-sm text-gray-500">{displayWorker.userId?.phone}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(displayWorker.rating)}
                      <span className="text-sm font-semibold text-gray-700 ml-1">
                        {displayWorker.rating?.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({displayWorker.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                  displayWorker.isAvailable
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-500"
                }`}>
                  {displayWorker.isAvailable ? "● Available" : "● Busy"}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {displayWorker.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-medium capitalize"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  ["📍", "Area", displayWorker.area],
                  ["🛠", "Experience", `${displayWorker.experience} years`],
                  ["⭐", "Rating", displayWorker.rating?.toFixed(1) || "New"],
                ].map(([icon, label, value]) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-lg mb-1">{icon}</p>
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-sm font-semibold text-gray-700">{value}</p>
                  </div>
                ))}
              </div>

              {/* Bio */}
              {displayWorker.bio && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">About</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{displayWorker.bio}</p>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Reviews ({displayReviews.length})
              </h2>

              {displayReviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-4xl mb-2">💬</p>
                  <p className="text-gray-400 text-sm">No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayReviews.map((review) => (
                    <div key={review._id} className="border-b border-gray-50 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                            {review.userId?.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {review.userId?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed pl-10">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Book this Worker</h3>
              <p className="text-sm text-gray-500 mb-4">Fast & reliable service guaranteed</p>

              {/* Rate */}
              <div className="bg-blue-50 rounded-xl p-4 mb-4 text-center">
                <p className="text-3xl font-extrabold text-blue-600">
                  ₹{displayWorker.ratePerDay}
                </p>
                <p className="text-xs text-blue-400 mt-1">per day</p>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-6">
                {[
                  ["📍", `Area: ${displayWorker.area}`],
                  ["🛠", `Experience: ${displayWorker.experience} years`],
                  ["⭐", `Rating: ${displayWorker.rating?.toFixed(1) || "New"}`],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Book Button */}
              {displayWorker.isAvailable ? (
                <button
                  
onClick={() => {
  if (!user) {
    navigate("/login")
  } else {
    navigate(`/booking/${displayWorker._id}`)
  }
}}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  Book Now →
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-100 text-gray-400 font-semibold py-3 rounded-xl text-sm cursor-not-allowed"
                >
                  Currently Unavailable
                </button>
              )}

              <p className="text-xs text-gray-400 text-center mt-3">
                Free cancellation before acceptance
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WorkerDetail