"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle, Circle, Eye, EyeClosed } from "lucide-react";

const passwordRequirements = [
  { key: 'length', text: 'At least 8 characters long', regex: /.{8,}/ },
  { key: 'uppercase', text: 'Include uppercase letters', regex: /[A-Z]/ },
  { key: 'lowercase', text: 'Include lowercase letters', regex: /[a-z]/ },
  { key: 'number', text: 'Include at least one number', regex: /[0-9]/ },
  { key: 'specialChar', text: 'Include at least one special character', regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ },
];

const assessPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length > 0) score++;

  const passedRequirements = passwordRequirements.filter(req => req.regex.test(password));
  score += passedRequirements.length;

  if (password.length >= 12 && passedRequirements.length === passwordRequirements.length) {
    score += 2;
  }

  if (score < 3) return { level: "Weak", color: "bg-red-500", width: "w-1/4" };
  if (score < 5) return { level: "Moderate", color: "bg-orange-500", width: "w-2/4" };
  if (score < 7) return { level: "Good", color: "bg-yellow-500", width: "w-3/4" };
  return { level: "Strong", color: "bg-cyan-500", width: "w-full" };
};

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ level: "None", color: "bg-gray-200", width: "w-0" });
  const [passwordMatch, setPasswordMatch] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    setPasswordStrength(assessPasswordStrength(password));
    setPasswordMatch(password === confirmPassword && password.length > 0);
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        icon: <Circle className="text-red-500" />,
      });
      return;
    }

    const load = toast.loading("Processing");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmpassword: confirmPassword }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.success || "New Password set successfully.", {
          icon: <CheckCircle className="text-cyan-500" />,
        });
        router.replace("/sign-in");
      } else {
        const errorText = await res.text();
        try {
          const errorData = JSON.parse(errorText);
          toast.error(
            errorData.error || "An error occurred. Please try again.",
            {
              icon: <Circle className="text-red-500" />,
            }
          );
        } catch {
          toast.error("Unknown error occurred.");
        }
      }
    } catch (err: unknown) {
      console.error("Error in password submission:", err);
      toast.error("Network error. Please try again later.", {
        icon: <Circle className="text-red-500" />,
      });
    }
    toast.dismiss(load);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="text-white text-3xl animate-pulse">💧</div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 animate-gradient"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Reset Your Password</h2>
        <p className="text-gray-600 text-center mb-6">Create a new, secure password for your account.</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300
                             focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                             transition-all duration-200 bg-white text-gray-900
                             placeholder:text-gray-400 shadow-sm"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeClosed className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirmpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`block w-full px-4 py-3 rounded-lg border
                             ${password.length > 0 && confirmPassword.length > 0 && !passwordMatch ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'}
                             transition-all duration-200 bg-white text-gray-900
                             placeholder:text-gray-400 shadow-sm`}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeClosed className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {password.length > 0 && confirmPassword.length > 0 && (
                <p className={`mt-2 text-sm flex items-center ${passwordMatch ? 'text-cyan-600' : 'text-red-600'}`}>
                  {passwordMatch ? (
                    <>
                      <CheckCircle className="mr-1.5 h-4 w-4" /> Passwords match
                    </>
                  ) : (
                    <>
                      <Circle className="mr-1.5 h-4 w-4" /> Passwords do not match
                    </>
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full ${passwordStrength.color} transition-all duration-300 ${passwordStrength.width}`} />
            </div>
            <p className="text-sm text-gray-600">
              Password strength:{" "}
              <span className={`font-medium ${passwordStrength.level === "Weak" ? 'text-red-600' : passwordStrength.level === "Moderate" ? 'text-orange-600' : passwordStrength.level === "Good" ? 'text-yellow-600' : 'text-cyan-600'}`}>
                {passwordStrength.level}
              </span>
            </p>
            <div className="text-sm text-gray-600">
              {passwordRequirements.map((req) => (
                <p key={req.key} className={`flex items-center ${req.regex.test(password) ? 'text-cyan-600' : 'text-gray-400'}`}>
                  {req.regex.test(password) ? (
                    <CheckCircle className="mr-1.5 h-4 w-4" />
                  ) : (
                    <Circle className="mr-1.5 h-4 w-4" />
                  )}
                  {req.text}
                </p>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-lg
                       bg-gradient-to-r from-cyan-600 to-purple-600 text-white
                       font-semibold text-lg shadow-lg shadow-cyan-500/30
                       hover:shadow-xl hover:shadow-cyan-500/50
                       transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!passwordMatch || passwordStrength.level === "Weak" || password.length === 0}
          >
            Reset Password
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
              className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors hover:underline"
            >
              Back to Sign in
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}