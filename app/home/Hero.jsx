"use client";
import { useEffect, useState } from "react";
import Img from "../components/Img";
import Link from "next/link";
import { FaArrowCircleRight, FaArrowRight } from "react-icons/fa";

const Hero = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="absolute inset-0 blur-xl h-[580px]"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      ></div>
      <div className="relative">
        <section>
          <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
            <div className="flex-none mx-auto space-y-5 max-w-xl text-center md:text-start">
              <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl">
                The Complete Health Management Platform
              </h1>
              <p>
                Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae.
              </p>
              <div className="flex justify-center md:justify-start items-center gap-x-3 sm:text-sm">
                <Link
                  href="/patient/dashboard"
                  className="flex items-center justify-center gap-x-2 hover:gap-x-3.5 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
                >
                  Get started
                  <FaArrowCircleRight />
                </Link>
              </div>
            </div>
            <div className="flex-1 hidden md:block">
              {/* Replace with your image */}
              <Img
                src="https://raw.githubusercontent.com/sidiDev/remote-assets/c86a7ae02ac188442548f510b5393c04140515d7/undraw_progressive_app_m-9-ms_oftfv5.svg"
                className="max-w-xl"
                alt="Hero Preview"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
