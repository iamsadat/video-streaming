"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-20 bg-gradient-to-r from-gray-900 to-blue-900">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-white">
          Stream<span className="text-blue-400">Craft</span>
        </Link>

        {/* Menu Items for larger screens */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/home"
            className="text-lg text-white hover:text-blue-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="#features"
            className="text-lg text-white hover:text-blue-400 transition duration-300"
          >
            Features
          </Link>
          <Link
            href="#why-streamcraft"
            className="text-lg text-white hover:text-blue-400 transition duration-300"
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="text-lg text-white hover:text-blue-400 transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Auth Button */}
        <div className="hidden md:block">
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <Link href="/signup">
              <Button className="px-4 py-2 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300">
                Sign Up
              </Button>
            </Link>
          </SignedOut>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-gradient-to-r from-gray-900 to-blue-900 text-white md:hidden">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link
                href="#features"
                className="text-lg hover:text-blue-400 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-lg hover:text-blue-400 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#about"
                className="text-lg hover:text-blue-400 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-lg hover:text-blue-400 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link href="/signup">
                <Button className="px-4 py-2 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
