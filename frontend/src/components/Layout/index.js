import React from "react";
import Navbar from "../../components/Navbar";
import Container from "react-bootstrap/Container";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container>{children}</Container>
    </React.Fragment>
  );
};

export default Layout;
