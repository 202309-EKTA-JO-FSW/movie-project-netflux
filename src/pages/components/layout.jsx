import React from "react"
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}
