import React, { Fragment } from "react";
import Header from "./Header/Header";
// import { Outlet } from "react-router-dom";

import Banner from "./Header/Banner/Banner";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <Header />
      {/* <Banner /> */}
      <Outlet />

      <Footer />
    </Fragment>
  );
};

export default Home;
