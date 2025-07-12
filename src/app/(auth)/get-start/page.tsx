'use client'
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      
      {/* Enhanced animated background with modern glassmorphism */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-15%] w-[40rem] h-[40rem] bg-gradient-to-br from-blue-400/20 via-cyan-300/15 to-transparent rounded-full blur-3xl animate-pulse opacity-70"></div>
        <div className="absolute bottom-[-25%] right-[-10%] w-[35rem] h-[35rem] bg-gradient-to-br from-violet-400/20 via-purple-300/15 to-transparent rounded-full blur-3xl animate-pulse opacity-60 animation-delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-br from-emerald-300/15 via-teal-200/10 to-transparent rounded-full blur-3xl animate-pulse opacity-50 animation-delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce animation-delay-500"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce animation-delay-1500"></div>
        <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-bounce animation-delay-2500"></div>
      </div>

      {/* Main content with enhanced animations */}
      <div className="max-w-md w-full text-center relative z-10 animate-fade-in-up">
        
        {/* Premium glass card with enhanced depth */}
        <div className="backdrop-blur-xl bg-white/90 border border-white/40 rounded-3xl p-10 shadow-2xl shadow-slate-900/10 hover:shadow-3xl transition-all duration-700 ease-out hover:scale-105">
          
          {/* Logo with premium gradient and micro-interactions */}
          <div className="relative mb-8 inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative w-28 h-28 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto transform transition-all duration-500 hover:rotate-6 hover:scale-110 shadow-lg shadow-blue-500/20">
              <svg className="w-14 h-14 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" className="animate-pulse" />
                <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" fill="currentColor" className="opacity-80" />
              </svg>
            </div>
          </div>

          {/* Brand name with enhanced typography */}
          <div className="mb-3">
            <h1 className="text-5xl font-black text-slate-800 mb-1 tracking-tight">
              Eko<span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">Drop</span>
            </h1>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto opacity-60"></div>
          </div>

          {/* Enhanced tagline */}
          <p className="text-slate-600 text-lg mb-10 font-medium leading-relaxed">
            Share thoughts, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">create ripples</span>
            <br />
            <span className="text-sm text-slate-500">Join the conversation</span>
          </p>

          {/* Premium CTA buttons */}
          <div className="space-y-4 mb-10">
            <Link
              href="/sign-in" 
              className="group relative block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 ease-out transform hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-3">
                Sign In
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>

            <Link
              href="/sign-up" 
              className="group relative block w-full bg-white/80 backdrop-blur-sm text-slate-700 py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 ease-out transform hover:bg-white hover:shadow-lg hover:shadow-slate-500/10 hover:-translate-y-1 active:scale-95 border border-slate-200/60"
            >
              <span className="flex items-center justify-center gap-3">
                Get Started Free
                <svg className="w-5 h-5 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Enhanced social proof */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              <Image 
                width={36} 
                height={36} 
                className="w-9 h-9 rounded-full ring-3 ring-white shadow-sm hover:scale-110 transition-transform duration-200" 
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="User testimonial"
              />
              <Image 
                width={36} 
                height={36} 
                className="w-9 h-9 rounded-full ring-3 ring-white shadow-sm hover:scale-110 transition-transform duration-200" 
                src="https://images.unsplash.com/photo-1550525811-e58691053ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="User testimonial"
              />
              <Image 
                width={36} 
                height={36} 
                className="w-9 h-9 rounded-full ring-3 ring-white shadow-sm hover:scale-110 transition-transform duration-200" 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="User testimonial"
              />
              <div className="w-9 h-9 rounded-full ring-3 ring-white bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm hover:scale-110 transition-transform duration-200">
                5k+
              </div>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-slate-700">Join 5,000+ creators</div>
              <div className="text-xs text-slate-500">sharing their stories</div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 pt-6 border-t border-slate-200/60">
            <div className="flex items-center justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium">Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium">Verified</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium">Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-2500 {
          animation-delay: 2.5s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.15);
        }
        
        .ring-3 {
          --tw-ring-width: 3px;
        }
      `}</style>
    </div>
  );
}