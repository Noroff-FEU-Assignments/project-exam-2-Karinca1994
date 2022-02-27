import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../common/Button";
import { useRouter } from "next/router";

export const NavBar = ({ active }) => {
  const [showLink, setShowLink] = useState(false);

  const toggleLink = () => {
    setShowLink(!showLink);
  };

  return (
    <nav className="flex flex-wrap flex-row justify-between md:items-center md:space-x-4 bg-white py-2 px-6 relative shadow-md">
      <Link href="/">
        <div>
          <Image src="/images/logo/holidaze.png" width={100} height={77} />
        </div>
      </Link>
      <button onClick={toggleLink} className="px-4 cursor-pointer md:hidden">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <nav
        className={`${showLink ? "" : "hidden"}  md:inline-flex text-black 
       flex-col md:flex-row md:space-x-6 w-full md:w-auto pt-5 p-1 grid grid-rows-3`}
      >
        <Link href="/" className="p-4">
          <a className={active.toLowerCase() === "home" ? "active" : "p-4"}>
            Home
          </a>
        </Link>

        <Link href="/accomodations" className="p-4 ">
          <a
            className={
              active.toLowerCase() === "accomodations" ? "active" : "p-4"
            }
          >
            Accomodation
          </a>
        </Link>

        <Link href="/contact" className="p-4">
          <a className={active.toLowerCase() === "contact" ? "active" : "p-4"}>
            Contact
          </a>
        </Link>
      </nav>
    </nav>
  );
};

export const AdminNavBar = () => {
  const [showLink, setShowLink] = useState(false);

  const toggleLink = () => {
    setShowLink(!showLink);
  };

  const router = useRouter();

  const logoutHandler = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <>
      <nav className="flex flex-wrap flex-row justify-between md:items-center md:space-x-4 bg-white px-6 relative shadow-md">
        <Link href="/admin">
          <a className="text-gray-700 hover:text-gray-800 p-4 ">Admin Home</a>
        </Link>
        <button onClick={toggleLink} className="px-4 cursor-pointer md:hidden">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <nav
          className={`${showLink ? "" : "hidden"}  md:inline-flex text-black 
       flex-col md:flex-row md:space-x-6 w-full md:w-auto pt-2 p-1 grid grid-rows-6`}
        >
          <Link href="../admin/readenquiries">
            <a className="text-gray-500 hover:text-gray-600 p-2 ">Enquiries</a>
          </Link>
          <Link href="../admin/readmessages">
            <a className="text-gray-500 hover:text-gray-600 p-2 ">Messages</a>
          </Link>
          <Link href="../admin/addaccomodation">
            <a className="text-gray-500 hover:text-gray-600 p-2 ">
              New accomodation
            </a>
          </Link>
          <Link href="../admin/editaccomodation">
            <a className="text-gray-500 hover:text-gray-600 p-2 ">
              Edit accomodations
            </a>
          </Link>
          <Button onClick={logoutHandler}>Logout</Button>
        </nav>
      </nav>
    </>
  );
};
