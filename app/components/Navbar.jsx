"use client";
import Link from "next/link";
import Img from "./Img";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data, status } = useSession();
  console.log(data, status);

  return (
    <div className="navbar bg-base-100/20 shadow-sm px-2 sm:px-5">
      <div className="flex-1">
        <Link
          href="/"
          className="font-bold text-xl lg:text-2xl text-writing flex gap-x-2"
        >
          <Img src="/logo.svg" alt="Logo - Plus sign" className="!w-7" />
          Cura
        </Link>
      </div>

      {status === "authenticated" ? (
        // Show profile Logo if authenticated
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="justify-between" href={"/patient"}>
                Dashboard
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <p onClick={() => signOut({ callbackUrl: "/login" })}>Sign out</p>
            </li>
          </ul>
        </div>
      ) : status === "loading" ? (
        <div className="">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        // Else display login and search button
        <Link href={"/login"} className="btn btn-sm md:btn-md btn-primary">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
