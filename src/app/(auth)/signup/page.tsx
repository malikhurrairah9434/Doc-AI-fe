"use client"
import { useState, useEffect } from "react"

export default function SignupPage() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    currentMedications: "",
    pastDiseases: "",
    currentDiseases: "",
    allergies: "",
    chronicConditions: ""
  })
  const [isLoaded, setIsLoaded] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log("Signup data:", form) // later send to backend
  }

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <main className="min-h-screen overflow-hidden relative flex items-center justify-center py-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-105"
        style={{
          backgroundImage: 'url(/bg.jpg)',
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-blue-50/85 to-indigo-100/90"></div>

      {/* Floating medical icons - subtle */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-20 text-blue-300/30 animate-float" style={{animationDelay: '0s'}}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8z"/>
          </svg>
        </div>
        <div className="absolute bottom-32 right-32 text-teal-300/30 animate-float" style={{animationDelay: '2s'}}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
        </div>
        <div className="absolute top-1/2 right-20 text-indigo-300/30 animate-float" style={{animationDelay: '3s'}}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Logo */}
        <div className={`text-center mb-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <img 
            src="/logo.png" 
            alt="Doc AI Logo" 
            className="h-28 w-auto mx-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Sign Up Form */}
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  1
                </div>
                <div className={`w-16 h-1 transition-all duration-300 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  2
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-center text-slate-600 mb-8">
              {currentStep === 1 ? 'Basic Information' : 'Medical History'}
            </p>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'name' ? 'text-blue-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400 text-slate-700 hover:bg-white/90"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'email' ? 'text-blue-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400 text-slate-700 hover:bg-white/90"
                    required
                  />
                </div>

                {/* Age and Gender Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'age' ? 'text-blue-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                      </svg>
                    </div>
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={form.age}
                      onChange={handleChange}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400 text-slate-700 hover:bg-white/90"
                      required
                    />
                  </div>

                  <div className="relative">
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full pl-4 pr-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-slate-700 hover:bg-white/90 appearance-none"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'password' ? 'text-blue-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400 text-slate-700 hover:bg-white/90"
                    required
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'confirmPassword' ? 'text-blue-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400 text-slate-700 hover:bg-white/90"
                    required
                  />
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Continue to Medical History
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                  </span>
                </button>
              </div>
            )}

            {/* Step 2: Medical Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Current Medications */}
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'currentMedications' ? 'text-blue-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <textarea
                    name="currentMedications"
                    placeholder="Current Medications (e.g., Aspirin 100mg daily, Metformin 500mg twice daily)"
                    value={form.currentMedications}
                    onChange={handleChange}
                    onBlur={() => setFocusedInput(null)}
                    rows={3}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400 text-slate-700 hover:bg-white/90 resize-none"
                  />
                </div>

                {/* Allergies */}
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'allergies' ? 'text-blue-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                    </svg>
                  </div>
                  <textarea
                    name="allergies"
                    placeholder="Known Allergies (e.g., Penicillin, Peanuts, Latex)"
                    value={form.allergies}
                    onChange={handleChange}
                    onBlur={() => setFocusedInput(null)}
                    rows={3}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400 text-slate-700 hover:bg-white/90 resize-none"
                  />
                </div>

                {/* Current Diseases */}
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'currentDiseases' ? 'text-blue-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8z"/>
                    </svg>
                  </div>
                  <textarea
                    name="currentDiseases"
                    placeholder="Current Health Conditions (e.g., Diabetes Type 2, Hypertension)"
                    value={form.currentDiseases}
                    onChange={handleChange}
                    onBlur={() => setFocusedInput(null)}
                    rows={3}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400 text-slate-700 hover:bg-white/90 resize-none"
                  />
                </div>

                {/* Past Diseases */}
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'pastDiseases' ? 'text-blue-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                    </svg>
                  </div>
                  <textarea
                    name="pastDiseases"
                    placeholder="Past Medical History (e.g., Appendectomy 2019, Pneumonia 2020)"
                    value={form.pastDiseases}
                    onChange={handleChange}
                    onBlur={() => setFocusedInput(null)}
                    rows={3}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400 text-slate-700 hover:bg-white/90 resize-none"
                  />
                </div>

                {/* Chronic Conditions */}
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'chronicConditions' ? 'text-blue-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <textarea
                    name="chronicConditions"
                    placeholder="Chronic Conditions (e.g., Asthma, Arthritis, Heart Disease)"
                    value={form.chronicConditions}
                    onChange={handleChange}
                    onBlur={() => setFocusedInput(null)}
                    rows={3}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400 text-slate-700 hover:bg-white/90 resize-none"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4l1.41 1.41L7.83 11H20v2H7.83l5.58 5.59L12 20l-8-8 8-8z"/>
                      </svg>
                      Back
                    </span>
                  </button>
                  
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Create Account
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Already have an account?{" "}
                <a 
                  href="/login" 
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(-20px) rotate(-2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}