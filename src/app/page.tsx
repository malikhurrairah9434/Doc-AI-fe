'use client'

import { useState, useEffect } from "react";
import LoginPage from "./(auth)/login/page";
import SignupPage from "./(auth)/signup/page";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-100"
        style={{
          backgroundImage: 'url(/bg.jpg)',
        }}
      ></div>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-teal-200/20 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3s'}}></div>
      </div>

      {/* Floating medical icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-blue-300/40 animate-float" style={{animationDelay: '0s'}}>
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6h5v2h2V6h1V4H4v2zm0 4h3v2h2v-2h3V8H4v2zm0 4h1v2h2v-2h1v-2H4v2z"/>
          </svg>
        </div>
        <div className="absolute top-40 right-32 text-teal-300/40 animate-float" style={{animationDelay: '1s'}}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-40 left-32 text-indigo-300/40 animate-float" style={{animationDelay: '2s'}}>
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <img 
            src="/logo.png" 
            alt="Doc AI Logo" 
            className="h-32 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Main content */}
        <div className={`text-center max-w-4xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8 space-y-4">
            <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed">
              Your trusted companion for comprehensive medication information and health insights
            </p>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Access detailed drug information, interaction warnings, dosage guidelines, and personalized health recommendations. 
              Our AI-powered platform helps you make informed decisions about your healthcare.
            </p>
          </div>

          {/* Trust indicators */}
          <div className={`flex flex-wrap justify-center gap-6 mb-10 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="flex items-center gap-2 text-slate-600 bg-white/70 px-4 py-2 rounded-full backdrop-blur-sm">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span className="text-sm font-medium">FDA Database</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 bg-white/70 px-4 py-2 rounded-full backdrop-blur-sm">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              <span className="text-sm font-medium">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 bg-white/70 px-4 py-2 rounded-full backdrop-blur-sm">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-sm font-medium">Clinically Verified</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a
              href="/login"
              onMouseLeave={() => setHoveredButton(null)}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-w-[140px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Sign In
                <svg className={`w-4 h-4 transition-transform duration-300 ${hoveredButton === 'login' ? 'translate-x-1' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </span>
            </a>
            
            <a
              href="/signup"
              onMouseLeave={() => setHoveredButton(null)}
              className="group relative px-8 py-4 bg-white text-slate-700 rounded-2xl font-semibold shadow-xl hover:shadow-2xl border border-slate-200 hover:border-blue-300 transform hover:-translate-y-1 transition-all duration-300 min-w-[140px] overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <svg className={`w-4 h-4 transition-transform duration-300 ${hoveredButton === 'signup' ? 'translate-x-1' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className={`mt-8 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm text-slate-500 bg-white/50 backdrop-blur-sm rounded-xl px-6 py-3 inline-block border border-slate-200/50">
              <svg className="w-4 h-4 inline-block mr-2 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
              This information is for educational purposes only. Always consult with healthcare professionals before making medical decisions.
            </p>
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
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}