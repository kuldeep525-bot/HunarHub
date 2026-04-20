import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../utils/axios"

// Worker Card Component
function WorkerCard({ worker }) {
  const navigate = useNavigate()
  const skills = worker.skills?.join(", ") || "N/A"
  const initial = worker.userId?.name?.charAt(0).toUpperCase() || "W"

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      {/* Top Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">
            {initial}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {worker.userId?.name || "Worker"}
            </h3>
            <p className="text-xs text-gray-500">{worker.userId?.phone || ""}</p>
          </div>
        </div>
        {/* Available Badge */}
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          worker.isAvailable
            ? "bg-green-50 text-green-600"
            : "bg-red-50 text-red-500"
        }`}>
          {worker.isAvailable ? "● Available" : "● Busy"}
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {worker.skills?.map((skill) => (
          <span
            key={skill}
            className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium capitalize"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Info Row */}
      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
        <span>📍 {worker.area}</span>
        <span>•</span>
        <span>🛠 {worker.experience} yrs exp</span>
        <span>•</span>
        <span>⭐ {worker.rating?.toFixed(1) || "New"}</span>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div>
          <span className="text-lg font-bold text-gray-900">₹{worker.ratePerDay}</span>
          <span className="text-xs text-gray-400">/day</span>
        </div>
        <button
          onClick={() => navigate(`/worker/${worker._id}`)}
          className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        >
          View Profile →
        </button>
      </div>
    </div>
  )
}

// Skeleton Loader
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-xl" />
        <div className="flex-1">
          <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-2 bg-gray-100 rounded w-16" />
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        <div className="h-6 bg-gray-100 rounded-full w-20" />
        <div className="h-6 bg-gray-100 rounded-full w-16" />
      </div>
      <div className="h-2 bg-gray-100 rounded w-full mb-4" />
      <div className="flex justify-between items-center pt-3 border-t border-gray-50">
        <div className="h-5 bg-gray-200 rounded w-16" />
        <div className="h-8 bg-gray-200 rounded-lg w-24" />
      </div>
    </div>
  )
}

// Main Home Component
function Home() {
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(false)
  const [skill, setSkill] = useState("")
  const [area, setArea] = useState("")
  const [error, setError] = useState("")

   useEffect(() => {
    fetchWorkers()
  }, [skill, area])

  const fetchWorkers = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/worker/getAllWorker?skill=${skill}&area=${area}`)
      
      setWorkers(res.data.workers)
    } catch (err) {
      setError("Workers fetch nahi hue")
    } finally {
      setLoading(false)
    }
  }

 const skills = [
  { label: "All", value: "" },

  { label: "⚡ Electrician", value: "electrician" },
  { label: "🔩 Plumber", value: "plumber" },
  { label: "🪚 Carpenter", value: "carpenter" },
  { label: "🎨 Painter", value: "painter" },
  { label: "🔧 Mechanic", value: "mechanic" },
  { label: "🧹 Cleaner", value: "cleaner" },

  { label: "🌿 Gardener", value: "gardener" },
  { label: "🚗 Driver", value: "driver" },
  { label: "🛡️ Security Guard", value: "security_guard" },
  { label: "📦 Delivery Boy", value: "delivery_boy" },
  { label: "👷 Helper", value: "helper" },
  { label: "🧱 Mason", value: "mason" },
];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🇮🇳 Trusted by 1000+ Users across India
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Find Skilled Workers
            <br />
            <span className="text-blue-200">Near You</span>
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Book trusted electricians, plumbers, carpenters and more — in minutes.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="📍 Enter your area (e.g. Ludhiana)"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-700 text-sm outline-none rounded-xl"
            />
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="px-4 py-3 text-gray-700 text-sm outline-none rounded-xl border border-gray-100 bg-gray-50"
            >
              {skills.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-3 gap-4 text-center">
          {[
            ["500+", "Verified Workers"],
            ["1200+", "Bookings Done"],
            ["4.8 ⭐", "Average Rating"],
          ].map(([val, label]) => (
            <div key={label}>
              <p className="text-xl font-extrabold text-blue-600">{val}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Workers Section */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Available Workers</h2>
            <p className="text-sm text-gray-500 mt-1">
              {workers.length > 0 ? `${workers.length} workers found` : "Find your perfect worker"}
            </p>
          </div>
          {/* Active filters */}
          {(skill || area) && (
            <button
              onClick={() => { setSkill(""); setArea("") }}
              className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              ✕ Clear filters
            </button>
          )}
        </div>

        {/* Skill Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {skills.map((s) => (
            <button
              key={s.value}
              onClick={() => setSkill(s.value)}
              className={`whitespace-nowrap text-xs font-medium px-4 py-2 rounded-full border transition-colors ${
                skill === s.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 text-sm mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Workers Grid */}
        {!loading && workers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {workers.map((worker) => (
              <WorkerCard key={worker._id} worker={worker} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && workers.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">👷</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No workers found</h3>
            <p className="text-sm text-gray-400 mb-6">Try changing your filter or area</p>
            <button
              onClick={() => { setSkill(""); setArea("") }}
              className="text-sm font-medium text-white bg-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show all workers
            </button>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-xl font-extrabold text-gray-900 mb-1">
            🔧 Hunar<span className="text-blue-600">Hub</span>
          </p>
          <p className="text-sm text-gray-400">Connecting skilled workers with people who need them.</p>
          <p className="text-xs text-gray-300 mt-4">© 2024 HunarHub. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

export default Home
