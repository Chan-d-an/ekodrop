import React from "react";
import { handleGoogleSignIn } from "@/actions/user";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Sign In",
  description: "Access your EkoDrop account securely.",
};

export default async function Login() {
  const session = await getSession();
  const user = session?.user;
  if (user) {
    redirect("/");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center  ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl 
      ">
        <div className="flex justify-center mb-8 ">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="text-white text-3xl animate-pulse">💧</div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 animate-gradient"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Sign In to EkoDrop</h2>
        <p className="text-gray-600 text-center mb-6">Access your account to share your thoughts.</p>

        {/* Social Login Options */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <form className="w-full" action={handleGoogleSignIn}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 p-3 bg-white border border-gray-300 
                         rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 48 48"
                
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.37 1.46 8.31 3.45l6.19-6.18C34.82 2.73 29.77 0 24 0 14.92 0 7.14 5.52 3.63 13.5l7.27 5.64C12.81 13.44 17.96 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.64 24.55c0-1.59-.14-2.78-.44-3.99H24v7.58h12.78c-.26 2.01-1.67 5.02-4.83 7.05l7.45 5.77c4.35-4.02 6.84-9.94 6.84-16.41z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.9 28.14a14.64 14.64 0 0 1 0-9.29l-7.27-5.65a24.037 24.037 0 0 0 0 20.58l7.27-5.64z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.91-2.13 15.88-5.81l-7.45-5.77c-2.02 1.36-4.74 2.28-8.43 2.28-6.04 0-11.19-3.94-13.1-9.34l-7.27 5.65C7.14 42.48 14.92 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">
                Continue with Google
              </span>
            </button>
          </form>
        </div>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">
              or continue with
            </span>
          </div>
        </div>

        <LoginForm />


      </div>
    </div>
  );
}