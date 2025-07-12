"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { CheckCircle2, Webhook } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const load = toast.loading("Processing");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      toast.dismiss(load);

      if (res.ok) {
        toast.success(
          data.success || "Password reset link sent successfully.",
          {
            icon: <CheckCircle2 className="text-cyan-500" />,
          }
        );
      } else {
        toast.error(data.error || "Something went wrong", {
          icon: <Webhook className="text-red-500" />,
        });
      }
    } catch (err: unknown) {
      console.error("Error in forgot password submission:", err);
      toast.dismiss(load);
      toast.error("Network error. Please try again later.", {
        icon: <Webhook className="text-red-500" />,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
            <div className="text-white text-3xl">💧</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Reset Your Password</h2>
        <p className="text-gray-600 text-center mb-6">Enter your email to receive reset instructions.</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 
                         focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                         transition-colors bg-white text-gray-900 text-base
                         placeholder:text-gray-400 shadow-sm"
              placeholder="Enter your registered email"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-lg 
                       bg-gradient-to-r from-cyan-600 to-purple-600 text-white 
                       font-semibold shadow-lg shadow-cyan-500/25 
                       hover:shadow-xl hover:shadow-cyan-500/40 
                       transition-all duration-300 transform hover:scale-105"
          >
            Send Reset Instructions
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
              className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              Back to Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}