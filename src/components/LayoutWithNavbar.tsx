import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";


export const LayoutWithNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};