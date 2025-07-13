import React from "react";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Verification Sent | Arkin Organics",
  description: "We've sent a verification link to your email. Please check your inbox and complete the process to access your Arkin Organics account.",
};

export default async function VerificationSent() {
  const session = await getSession();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div>
      {/* Right Column - Verification Status */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-cyan-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Verification Email Sent!
            </h2>
            <p className="text-gray-600 max-w-sm mx-auto">
              We&apos;ve sent a verification link to your email address. Please
              check your inbox and follow the instructions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              type="button"
              className="w-full flex justify-center py-3.5 px-4 rounded-xl 
                       bg-gradient-to-r from-cyan-600 to-cyan-500 text-white 
                       font-medium shadow-lg shadow-cyan-500/25 
                       hover:shadow-xl hover:shadow-cyan-500/40 
                       transition-all duration-300"
            >
              Resend Verification Email
            </button>

            <div className="flex items-center justify-center space-x-2 text-sm">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              <Link
                href="/sign-in"
                className="text-cyan-600 hover:text-cyan-500 font-medium transition-colors"
              >
                Back to Sign in
              </Link>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
