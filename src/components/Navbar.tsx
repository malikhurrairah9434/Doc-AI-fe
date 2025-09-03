"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { User, LogOut, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Doc AI Logo"
              width={120}
              height={120}
              className="drop-shadow-lg hover:scale-110 transition-all duration-300 rounded-2xl border-2 border-white/50 shadow-lg"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
        </Link>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/profile"
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-200 transform hover:scale-105"
          >
            <User size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Profile</span>
          </Link>
          <Link
            href="/login"
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 hover:text-red-500 hover:bg-red-50/50 transition-all duration-200 transform hover:scale-105"
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-3 rounded-xl text-slate-600 hover:bg-slate-100/80 hover:text-slate-800 transition-all duration-200 transform hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={24} className="transition-transform duration-200" />
          ) : (
            <Menu size={24} className="transition-transform duration-200" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-8 pb-6 bg-white/95 backdrop-blur-xl border-t border-slate-200/50 shadow-lg">
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/profile"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <User size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Profile</span>
            </Link>
            <Link
              href="/login"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:text-red-500 hover:bg-red-50/50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <LogOut size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}