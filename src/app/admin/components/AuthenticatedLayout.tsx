"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./SideBar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else if (isLoggedIn === "true") {
      setIsAuthenticated(true);
    }
  }, [router, pathname]);

  if (!isAuthenticated && pathname !== "/admin/login") {
    return <>{children}</>; // Show login page without sidebar
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
