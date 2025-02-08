"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    // Perform logout actions here (e.g., clear local storage, cookies, etc.)
    // For this example, we'll just redirect to the login page
    router.push("/")
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Logging out...</p>
    </div>
  )
}

