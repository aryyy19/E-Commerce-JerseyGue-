import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
