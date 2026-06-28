import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import SidebarFreeUser from "../Sidebar2";
import Header from "../Header";
import { useUserInfo } from "../../hooks/useUserInfo";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isAuthenticated } = useUserInfo();

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
        setIsSidebarCollapsed(false);
      } else if (tablet) {
        setIsSidebarOpen(true);
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarOpen(true);
        setIsSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMobile && isSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isSidebarOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Sidebar width: open=220px, collapsed=64px, mobile hidden
  const mainMargin = isMobile
    ? "ml-0"
    : isSidebarCollapsed
      ? "lg:ml-16"
      : "lg:ml-[220px]";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="min-h-screen bg-neutral-light overflow-x-hidden">
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-35 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <SidebarFreeUser
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onOpen={() => setIsSidebarOpen(true)}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobile={isMobile}
      />

      <div
        className={`${mainMargin} flex-1 min-w-0 transition-all duration-300`}
      >
        <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-100">
          <Header />
        </header>

        <main className="p-4 sm:p-6 pb-8 min-h-[calc(100vh-56px)] w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
