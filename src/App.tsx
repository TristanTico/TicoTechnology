import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { ThemeProvider } from "./components/theme-provider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Cart } from "./components/Cart/Cart";
import { LoadingScreen } from "./components/Loading-skeleton/LoadingScreen";
import { LayoutWithNavbar } from "./components/LayoutWithNavbar";
import { useAuthStore } from "./store/authStore";
import { Dashboard } from "./components/dashboard/Dashbord";
function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const accessToken = useAuthStore((state) => state.accessToken);
  const loadUserRole = useAuthStore((state) => state.loadUserRole);
  useEffect(() => {
    if (accessToken) {
      loadUserRole();
    }
  }, [accessToken, loadUserRole]);
  if (!isLoaded) {
    return <LoadingScreen onComplete={() => setIsLoaded(true)} />;
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-opacity duration-700 opacity-100">
        <Routes>
          <Route element={<LayoutWithNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </ThemeProvider>
  );
}

export default App;
