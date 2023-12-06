import React from "react"
import MyNavbar from "./Navbar/MyNavbar"
import Footer from "./Footer/Footer"

export default function Layout({ children }) {
  return (
    <>
      <header>
        <MyNavbar />
      </header>
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}
