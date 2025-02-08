"use client"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple authentication check
    if (email === "taha321@gmail.com" && password === "taha12") {
      // Store auth state
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      // Redirect to dashboard
      router.push("/admin/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00B4B4]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="flex justify-center mb-6">
          <Image src="/p1.png" alt="Logo" width={100} height={100} priority />
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-center mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B4B4] focus:border-[#00B4B4]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B4B4] focus:border-[#00B4B4]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00B4B4] text-white py-2 px-4 rounded-md hover:bg-[#009999] focus:outline-none focus:ring-2 focus:ring-[#00B4B4] focus:ring-opacity-50 transition-colors duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

