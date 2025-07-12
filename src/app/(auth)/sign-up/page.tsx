"use client";
import React, { useState, useTransition } from "react";
import { handleGoogleSignIn, register } from "@/actions/user";
import { validatePassword, validateEmail } from "@/lib/validation";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeClosed, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  const [isPending, startTransition] = useTransition();
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, requirements: [] as string[] });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "password") {
      const { isValid, errors } = validatePassword(value);
      setPasswordStrength({
        score: isValid ? 100 : Math.min(60, (value.length / 8) * 100),
        requirements: errors,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const newErrors = {
      email: emailValidation.error || "",
      password: passwordValidation.errors[0] || "",
    };
    setFormErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value);
        });

        await register(formDataObj);
        toast.success("Account created successfully!", { icon: <CheckCircle2 className="text-cyan-500" /> });
      } catch (error) {
        console.error("Registration error:", error);
        toast.error(error instanceof Error ? error.message : "Failed to create account", {
          icon: <XCircle className="text-red-500" />,
        });
      }
    });
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
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Create Your EkoDrop Account</h2>
        <p className="text-gray-600 text-center mb-6">Join to share your thoughts and spread the echo.</p>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <form className="w-full" action={handleGoogleSignIn}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 p-3 bg-white border border-gray-300 
                         rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md text-base font-semibold text-gray-700"
              disabled={isPending}
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
              Continue with Google
            </button>
          </form>
        </div>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full px-4 py-3 rounded-lg border transition-all duration-200 shadow-sm ${
                  formErrors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
                } bg-white text-gray-900 placeholder:text-gray-400`}
                placeholder="john@example.com"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                autoComplete="username"
                disabled={isPending}
              />
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <XCircle className="mr-1.5 h-4 w-4" /> {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-3 rounded-lg border transition-all duration-200 shadow-sm ${
                    formErrors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
                  } bg-white text-gray-900 placeholder:text-gray-400`}
                  placeholder="********"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  disabled={isPending}
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
              {passwordStrength.requirements.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength.score >= 75 ? "bg-cyan-500" : passwordStrength.score >= 50 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${passwordStrength.score}%` }}
                    />
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {passwordStrength.requirements.map((req, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {formErrors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <XCircle className="mr-1.5 h-4 w-4" /> {formErrors.password}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Input
                type="checkbox"
                name="terms"
                id="terms"
                className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/legal/terms" className="text-cyan-600 hover:text-cyan-700 font-medium hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/legal/privacy" className="text-cyan-600 hover:text-cyan-700 font-medium hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={
              isPending ||
              passwordStrength.requirements.length > 0 ||
              Object.values(formErrors).some((error) => error) ||
              Object.values(formData).some((value) => value === "")
            }
            className={`w-full py-3 px-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
              !isPending &&
              passwordStrength.requirements.length === 0 &&
              !Object.values(formErrors).some((error) => error) &&
              !Object.values(formData).some((value) => value === "")
                ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:shadow-xl hover:shadow-cyan-500/40"
                : "bg-gray-200 text-gray-600 cursor-not-allowed opacity-70"
            }`}
          >
            {isPending ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="animate-spin h-5 w-5 text-cyan-400" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-sm text-gray-600 pt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline">
              Sign in now
            </Link>
          </p>
        </form>


      </div>
    </div>
  );
}