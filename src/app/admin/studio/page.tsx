"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { NextStudio } from "next-sanity/studio"
import config from "../../../../sanity.config"

export default function StudioPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <NextStudio config={config} />
}
