import React, { useState } from "react";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElements/Backdrop";
import { Outlet } from "react-router-dom";

export default function MainNavigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      {drawerOpen ? <BackDrop onClick={() => setDrawerOpen(false)} /> : null}
      <SideDrawer show={drawerOpen} onClick={() => setDrawerOpen(false)}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setDrawerOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
      <main>
        <Outlet />
      </main>
    </>
  );
}
