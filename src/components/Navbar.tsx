"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        🏥 MedAI
      </Link>

      {/* Links */}
      <div className="flex gap-6">
        <Link href="/profile" className="hover:text-gray-200 transition">
          Profile
        </Link>
        <Link href="/chat" className="hover:text-gray-200 transition">
          Chat
        </Link>
        <Link href="/login" className="hover:text-gray-200 transition">
          Logout
        </Link>
      </div>
    </nav>
  )
}
