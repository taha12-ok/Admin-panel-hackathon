"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface LoginState {
  email: string
  password: string
  error: string
  isLoading: boolean
  mounted: boolean
}

export default function AdminLogin() {
  const [state, setState] = useState<LoginState>({
    email: "",
    password: "",
    error: "",
    isLoading: false,
    mounted: false
  })
  const router = useRouter()

  useEffect(() => {
    setState(prev => ({ ...prev, mounted: true }))
    const checkAuth = () => {
      try {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true"
        if (loggedIn) {
          router.push("/admin/dashboard")
        }
      } catch (err) {
        console.error("Auth check error:", err)
      }
    }
    
    if (typeof window !== "undefined") {
      checkAuth()
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState(prev => ({ ...prev, [name]: value, error: "" }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setState(prev => ({ ...prev, isLoading: true, error: "" }))

    try {
      // Simulating a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500))

      if (state.email === "taha321@gmail.com" && state.password === "taha12") {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userEmail", state.email)
        router.push("/admin/dashboard")
      } else {
        setState(prev => ({ 
          ...prev, 
          error: "Invalid email or password",
          isLoading: false 
        }))
      }
    } catch (err) {
      console.error("Login error:", err)
      setState(prev => ({ 
        ...prev, 
        error: "An error occurred during login. Please try again.",
        isLoading: false 
      }))
    }
  }

  // Don't render anything during SSR or before mounting
  if (!state.mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00B4B4]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="flex justify-center mb-6">
          <Image 
            src="/p1.png" 
            alt="Logo" 
            width={100} 
            height={100} 
            priority 
            className="object-contain"
          />
        </div>
        
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h1>
        
        {state.error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-center mb-4">
            {state.error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B4B4] focus:border-[#00B4B4]"
              required
              disabled={state.isLoading}
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={state.password}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B4B4] focus:border-[#00B4B4]"
              required
              disabled={state.isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={state.isLoading}
            className={`w-full bg-[#00B4B4] text-white py-2 px-4 rounded-md hover:bg-[#009999] focus:outline-none focus:ring-2 focus:ring-[#00B4B4] focus:ring-opacity-50 transition-colors duration-200 ${
              state.isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {state.isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}
