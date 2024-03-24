import React from "react"
import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"
const Navbar = () => {
  return (
    <nav className="flex items-center mx-12 my-8">
      <div className="flex space-x-4 ">
        <Link
          href="/"
          className="text-black font-bold hover:text-gray-700 text-2xl"
        >
          Kubera
        </Link>
      </div>
      <div className="ml-auto flex items-center ">
        <ConnectButton />
      </div>
    </nav>
  )
}

export default Navbar
