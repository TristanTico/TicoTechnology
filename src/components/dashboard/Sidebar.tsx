import { useState } from "react";
import { Box, ClipboardList, Indent, LayoutGrid, LogOut, Menu, Users } from "lucide-react";
import { NavItem } from "./NavItem";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}
export const Sidebar: React.FC<SidebarProps> = ({activeSection, setActiveSection}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const userLogin = useAuthStore((state) => state.userLogin);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <h2 className={`font-bold ${isSidebarOpen ? "block" : "hidden"}`}>
          Dashboard
        </h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded hover:bg-gray-700"
          aria-label="Toggle Sidebar"
        >
          <Menu />
        </button>
      </div>
      <div className="mt-8">
        <NavItem
          icon={<Users />}
          text="Usuarios"
          section="usuarios"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
        />
        <NavItem
          icon={<Box />}
          text="Productos"
          section="productos"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
        />
        <NavItem
          icon={<LayoutGrid />}
          text="Categorias"
          section="categorias"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
        />
        <NavItem
          icon={<Indent />}
          text="Subcategorias"
          section="subcategorias"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
        />
        <NavItem
          icon={<ClipboardList />}
          text="Ordenes"
          section="ordenes"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <div className="flex items-center">
          {isSidebarOpen && userLogin && (
            <div className="ml-3">
              <p className="font-medium">{userLogin.nombreUsuario}</p>
              <button
                className="text-sm text-gray-400 flex items-center hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
