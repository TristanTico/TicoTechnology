import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AnimatePresence } from "framer-motion";
import { PageWrapper } from "./PageWrapper";

export const LayoutWithNavbar = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <PageWrapper key={location.pathname}>
          <Outlet />
        </PageWrapper>
      </AnimatePresence>
    </>
  );
};
