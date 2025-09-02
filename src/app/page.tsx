export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Doc AI</h1>
      <p className="mb-6 text-lg text-center max-w-xl">
        Get daily medicine recommendations and health advice for free.
        Always consult a doctor before taking any medication.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-2 bg-white text-blue-600 rounded-xl font-semibold shadow hover:bg-gray-200"
        >
          Login
        </a>
        <a
          href="/signup"
          className="px-6 py-2 bg-indigo-800 rounded-xl font-semibold shadow hover:bg-indigo-900"
        >
          Sign Up
        </a>
      </div>
    </main>
  )
}
