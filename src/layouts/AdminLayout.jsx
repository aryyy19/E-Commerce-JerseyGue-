import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed md:static inset-y-0 left-0 z-30 transform transition-transform duration-300 md:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Konten utama */}
      <main className="flex-1 p-4 md:p-6 min-w-0">
        {/* Tombol hamburger untuk mobile */}
        <button
          className="md:hidden mb-4 p-2 bg-gray-800 text-white rounded-lg"
          onClick={() => setSidebarOpen(true)}
          aria-label="Buka sidebar"
        >
          ☰ Menu Admin
        </button>

        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
