"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  FaCalendar,
  FaPrescriptionBottle,
  FaCreditCard,
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaBars,
  FaFileMedical,
} from "react-icons/fa";
import { RiDashboard3Fill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import Chatbot from "../components/Chatbot";

export default function PatientLayout({ children, title }) {
  const { status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log(status);

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  const navigation = [
    {
      name: "Dashboard",
      href: "/patient/dashboard",
      icon: <RiDashboard3Fill />,
    },
    {
      name: "Appointments",
      href: "/patient/appointments",
      icon: <FaCalendar />,
    },
    {
      name: "Medical Records",
      href: "/patient/records",
      icon: <FaFileMedical />,
    },
    {
      name: "Prescriptions",
      href: "/patient/prescriptions",
      icon: <FaPrescriptionBottle />,
    },
    { name: "Billing", href: "/patient/billing", icon: <FaCreditCard /> },
    { name: "Profile", href: "/patient/profile", icon: <FaUser /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>
          {title ? `${title} - Cura Patient Portal` : "Cura Patient Portal"}
        </title>
      </Head>

      {/* Mobile sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-[100%]"
        } fixed inset-0 z-40 duration-300`}
      >
        <div
          className="fixed inset-0 bg-transparent bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-100 h-full">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Link href="/" className="flex items-center">
                <Image src="/logo.svg" alt="Cura Logo" width={40} height={40} />
                <span className="ml-3 text-xl font-bold text-gray-700">
                  Cura
                </span>
              </Link>
            </div>
            <nav className="mt-10 px-2 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? "bg-primary/30 text-writing"
                        : "text-gray-600 hover:bg-blue-100"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-primary/30 p-4">
            <button
              className="flex-shrink-0 group block w-full"
              onClick={() => router.push("/api/auth/signout")}
            >
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-base cursor-pointer font-medium text-writing group-hover:text-gray-700 flex items-center">
                    <FaSignOutAlt />
                    <span className="ml-2">Sign out</span>
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col">
        <div className="sticky top-0 z-10 pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <FaBars />
          </button>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* <h1 className="text-2xl font-semibold text-gray-900">{title}</h1> */}
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-4">
              {children}
            </div>
          </div>
        </main>
      </div>
      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}
