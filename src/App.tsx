import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { ThemeProvider } from "./components/theme-provider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Cart } from "./components/Cart";
import { LoadingScreen } from "./components/LoadingScreen";
import { LayoutWithNavbar } from "./components/LayoutWithNavbar";
import { useAuthStore } from "./store/authStore";
import { Dashboard } from "./components/dashboard/Dashbord";
function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isAutenticated = useAuthStore((state) => state.isAuthenticated);
  const userLogin = useAuthStore((state) => state.userLogin);
  useEffect(() => {
    console.log(isAutenticated);
    console.log(userLogin);
    
  }, [isAutenticated]);
  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-white dark:bg-black text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route element={<LayoutWithNavbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </ThemeProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}

export default App;
