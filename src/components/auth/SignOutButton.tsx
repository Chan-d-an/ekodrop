'use client'
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignOutButtonProps {
  handleSignOut: () => Promise<void>;
}

export function SignOutButton({ handleSignOut }: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    setIsLoading(true);
    try {
      await handleSignOut();
      router.push('/')
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);

    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full flex items-center gap-2 px-3 py-2 text-lg  rounded-md transition-all duration-200 ${isLoading
          ? "text-tdark border border-secondary/10 hover:bg-secondary/10"
          : "text-tdark border border-secondary/10 hover:bg-secondary/10"
        }`}
      aria-label={isLoading ? "Signing out" : "Sign out"}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-cyan-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
            />
          </svg>
          Signing out...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <LogOut size={22} className="text-tdark" />
          Sign out
        </span>
      )}
    </button>
  );
}