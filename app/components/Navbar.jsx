"use client";
import Link from "next/link";
import Img from "./Img";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [staffId, setStaffId] = useState();
  const [forceLoginBtn, setForceLoginBtn] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  // console.log(data, status);

  useEffect(() => {
    const staff = window.localStorage.getItem("staffId");
    setStaffId(staff);
  }, []);

  return (
    <div className="navbar bg-base-100/20 shadow-sm px-4 sm:px-7">
      <div className="flex-1">
        <Link
          href="/"
          className="font-bold text-xl lg:text-2xl text-writing flex gap-x-2"
        >
          <Img src="/logo.svg" alt="Logo - Plus sign" className="!w-7" />
          Cura
        </Link>
      </div>

      {(status === "authenticated" ||
        staffId === "staff_001" ||
        staffId === "staff_002") & !forceLoginBtn ? (
        // Show profile Logo if authenticated
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar focus:ring ring-offset-1 ring-primary "
          >
            <div className="w-7 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.icons8.com/?size=180&id=3225&format=png"
              />
              {/* <FaUser /> */}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                className="justify-between"
                href={
                  staffId === "staff_001" || staffId === "staff_002"
                    ? "/staff/dashboard"
                    : "/patient/dashboard"
                }
              >
                Dashboard
                <span className="badge bg-writing/10">New</span>
              </Link>
            </li>
            <li>
              <a
                href={
                  staffId === "staff_001" || staffId === "staff_002"
                    ? "/login"
                    : null
                }
                onClick={() => {
                  window.localStorage.clear();
                  setForceLoginBtn(true);
                  staffId === "staff_001" || staffId === "staff_002"
                    ? null
                    : signOut({ callbackUrl: "/login" });
                }}
              >
                Sign out
              </a>
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
