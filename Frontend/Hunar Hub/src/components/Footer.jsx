import { Link } from "react-router-dom"
 
function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
 
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
 
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">
                🔧
              </div>
              <span className="text-xl font-extrabold">
                Hunar<span className="text-blue-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Skilled workers ko users se connect karta hai. Electricians, Plumbers, Carpenters — sab ek jagah.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: "💼", label: "LinkedIn", href: "#" },
                { icon: "🐙", label: "GitHub", href: "#" },
                { icon: "🐦", label: "Twitter", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-sm transition-colors"
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
 
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Find Workers", to: "/workers" },
                { label: "AI Assistant", to: "/chat" },
                { label: "Register as Worker", to: "/worker/register" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Services</h3>
            <ul className="space-y-2">
              {[
                "⚡ Electrician",
                "🔩 Plumber",
                "🪚 Carpenter",
                "🎨 Painter",
                "🔧 Mechanic",
                "🧹 Cleaner",
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3">
              {[
                { icon: "📍", text: "Chandigarh, India" },
                { icon: "📧", text: "support@hunarhub.com" },
                { icon: "📞", text: "+91 97797 81674" },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-2">
                  <span className="text-sm mt-0.5">{item.icon}</span>
                  <span className="text-sm text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>
 
            {/* App Badges */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2 cursor-pointer hover:bg-gray-700 transition-colors">
                <span className="text-lg">🍎</span>
                <div>
                  <p className="text-xs text-gray-400">Download on the</p>
                  <p className="text-xs font-bold text-white">App Store</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2 cursor-pointer hover:bg-gray-700 transition-colors">
                <span className="text-lg">🤖</span>
                <div>
                  <p className="text-xs text-gray-400">Get it on</p>
                  <p className="text-xs font-bold text-white">Google Play</p>
                </div>
              </div>
            </div>
          </div>
 
        </div>
      </div>
 
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © 2024 HunarHub. All rights reserved. Made with ❤️ in India
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
 
    </footer>
  )
}
 
export default Footer