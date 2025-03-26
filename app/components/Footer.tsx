import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="Cura Logo" width={40} height={40} />
              <span className="ml-3 text-xl font-bold text-white">Cura</span>
            </Link>
            <p className="text-gray-400 text-base">
              Transforming healthcare management through intelligent,
              human-centered technology.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <FaGithub />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Devpost</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 16.333h-1.58V6.055h1.58v11.888zm0.164-16.925L4.102 6.055h3.657l3.657-5.037h-3.657zM12 13.391a1.39 1.39 0 01-1.387-1.391c0-.767.622-1.39 1.387-1.39.765 0 1.387.623 1.387 1.39 0 .768-.622 1.391-1.387 1.391zm5.85 4.552h-1.581V6.055h1.58v11.888zm0.163-16.925l-3.657 5.037h3.657l3.657-5.037h-3.657z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  {[
                    "Patient Management",
                    "Smart Scheduling",
                    "Medical Analytics",
                    "Billing System",
                  ].map((item, i) => (
                    <li key={i}>
                      <a
                        href="#features"
                        className="text-base text-gray-400 hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Portals
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/admin/login"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Admin Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/patient/login"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Patient Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/staff/login"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Staff Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      API Reference
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Cura Health Systems. All rights
            reserved. Created for StackUp Hackathon.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
