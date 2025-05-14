import React, { ReactNode } from "react";
interface NavItemProps {
  icon: ReactNode;
  text: string;
  section: string;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSidebarOpen: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  text,
  section,
  activeSection,
  setActiveSection,
  isSidebarOpen,
}) => {
  return (
    <button
      onClick={() => setActiveSection(section)}
      className={`w-full p-4 flex items-center hover:bg-gray-700 ${
        activeSection === section ? "bg-gray-700" : ""
      }`}
    >
      {icon}
      {isSidebarOpen && <span className="ml-3">{text}</span>}
    </button>
  );
};
