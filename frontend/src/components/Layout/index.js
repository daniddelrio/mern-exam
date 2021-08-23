import React from "react";
import Navbar from "../../components/Navbar";

const Layout = ({children}) => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      {children}
    </React.Fragment>
  )
}

export default Layout;