import { Suspense } from 'react';
import { Metadata } from 'next';
import VerifyEmailClient from '@/components/auth/VerifyEmailClient';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Verify Your Account | Arkin Organics",
  description: "Complete your verification to access Arkin Organics. Confirm your identity and continue your journey toward sustainable agriculture.",
};

export default function VerifyEmail() {
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Professional Design */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Multi-layered background for depth */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-800 via-cyan-600 to-cyan-400" />

          {/* Organic patterns */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_100%)]" />
          <div className="absolute inset-0 opacity-40 bg-[url('/plant.png')] bg-cover bg-center mix-blend-overlay" />

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-300/10 rounded-full blur-3xl" />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col p-16 z-10">
         

          {/* Main Content */}
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Verifying Your Account
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Please wait while we verify your email address. This helps ensure the security of your account
              and gives you access to allArkin features.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mt-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="flex items-center text-white text-lg font-semibold mb-6">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Benefits of Verification
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center text-white/70">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Access to exclusive organic products</p>
                </li>
                <li className="flex items-center text-white/70">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Early access to seasonal products</p>
                </li>
                <li className="flex items-center text-white/70">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Special member discounts and offers</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md text-center">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-cyan-100" />
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Loading...</h2>
          </div>
        </div>
      }>
        <VerifyEmailClient />
      </Suspense>
    </div>
  );
}