"use client"

import { useState } from "react"
import Sidebar from "./SideBar"
import type React from "react"

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? "ml-80" : "ml-0"}`}>{children}</main>
    </div>
  )
}

