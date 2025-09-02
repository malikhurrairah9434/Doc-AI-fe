"use client"
import { useState } from "react"

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    diseases: "",
    currentMedications: "",
    previousMedications: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile Data:", form) // later send to backend
    alert("Profile saved successfully ✅")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Complete Your Profile</h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:ring focus:ring-indigo-200"
        />

        {/* Age */}
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:ring focus:ring-indigo-200"
        />

        {/* Diseases */}
        <textarea
          name="diseases"
          placeholder="Current & Past Diseases (comma separated)"
          value={form.diseases}
          onChange={handleChange}
          rows={3}
          className="w-full mb-4 p-3 border rounded-lg focus:ring focus:ring-indigo-200"
        />

        {/* Current Medications */}
        <textarea
          name="currentMedications"
          placeholder="Current Medications (comma separated)"
          value={form.currentMedications}
          onChange={handleChange}
          rows={2}
          className="w-full mb-4 p-3 border rounded-lg focus:ring focus:ring-indigo-200"
        />

        {/* Previous Medications */}
        <textarea
          name="previousMedications"
          placeholder="Previous Medications (comma separated)"
          value={form.previousMedications}
          onChange={handleChange}
          rows={2}
          className="w-full mb-4 p-3 border rounded-lg focus:ring focus:ring-indigo-200"
        />

        {/* Save button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Save Profile
        </button>
      </form>
    </main>
  )
}
