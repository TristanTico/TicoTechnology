import { useState } from "react";
import { Productos } from "./Productos/Productos";
import { Sidebar } from "./Sidebar";
import { Usuarios } from "./Usuarios/Usuarios";
import { Categorias } from "./Categories/Categorias";
import { SubCategorias } from "./SubCategories/SubCategoria";
import { Ordenes } from "./Ordenes/Ordenes";
export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string>("usuarios");
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 overflow-auto">
        {activeSection === "usuarios" && <Usuarios />}
        {activeSection === "productos" && <Productos />}
        {activeSection === "categorias" && <Categorias />}
        {activeSection === "subcategorias" && <SubCategorias />}
        {activeSection === "ordenes" && <Ordenes />}
      </div>
    </div>
  );
};
