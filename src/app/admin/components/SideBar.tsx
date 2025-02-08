"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FiMenu, FiX, FiHome, FiBox, FiShoppingCart, FiPieChart, FiSettings, FiLogOut } from "react-icons/fi"

export default function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [email, setEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    } else {
      setEmail(localStorage.getItem("userEmail") || "")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const menuItems = [
    { title: "Dashboard", icon: FiHome, path: "/admin/dashboard" },
    { title: "Products", icon: FiBox, path: "/admin/products" },
    { title: "Orders", icon: FiShoppingCart, path: "/admin/orders" },
    { title: "Analytics", icon: FiPieChart, path: "/admin/analytics" },
    { title: "Sanity Studio ", icon: FiSettings, path: "/admin/studio" },
  ]

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label="Open sidebar"
        >
          <FiMenu size={24} className="text-gray-700" />
        </button>
      )}

      <div
        className={`fixed w-80 bg-white shadow-2xl h-screen z-40 transition-all duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="bg-gradient-to-r from-[#00B4B4] to-[#00D4D4] text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Admin Panel</h2>
              <p className="text-sm text-white/80 mt-1">Manage your business</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close sidebar"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00B4B4] to-[#00D4D4] flex items-center justify-center text-white font-bold">
              {email.charAt(0).toUpperCase()}T
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Admin User</h3>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              onClick={() => setActiveItem(item.title)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${
                  activeItem === item.title
                    ? "bg-[#00B4B4]/10 text-[#00B4B4] font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <item.icon size={20} className={activeItem === item.title ? "text-[#00B4B4]" : ""} />
              {item.title}
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-gray-600 hover:bg-red-50 hover:text-red-600 mt-4"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Creator</p>
            <a
              href="https://www.linkedin.com/in/taha-shabbir-86367525a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#00B4B4] hover:text-[#008080] font-medium"
            >
              Taha Shabbir
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

