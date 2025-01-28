"use client"; // Indicates this is a Client Component

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs"; // Use client-side hooks from Clerk

export default function Header() {
  const { user } = useUser(); // Get the current user on the client side
  const { signOut } = useClerk(); // For signing out

  return (
    <header className="bg-purple-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-purple-800">
              FractureScan AI
            </Link>
          </div>
          <nav className="hidden md:flex">
            <div className="flex space-x-4 items-center">
              <Link href="#features" className="text-purple-600 hover:text-purple-800">
                Features
              </Link>
              <Link href="#about" className="text-purple-600 hover:text-purple-800">
                About
              </Link>
              <Link href="#contact" className="text-purple-600 hover:text-purple-800">
                Contact
              </Link>

              {/* Conditional Rendering: Login/Signup or Logout */}
              {user ? (
                <>
                  <span className="text-purple-600">
                    Hello, {user.firstName || "User"}!
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => signOut({ redirectUrl: '/' })}
                    className="border-purple-600 text-purple-600 hover:bg-purple-100"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    asChild
                    className="border-purple-600 text-purple-600 hover:bg-purple-100"
                  >
                    <Link href="/sign-in">Log in</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <Link href="/sign-up">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
