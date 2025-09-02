"use client"
import { useState } from "react"

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup data:", form) // later send to backend
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Sign Up
        </button>
        <p className="text-center mt-4 text-sm">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </form>
    </main>
  )
}
