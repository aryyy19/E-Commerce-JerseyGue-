import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-6">
      <h2 className="text-xl font-bold mb-6">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-4">
        <Link
          to="/admin/dashboard"
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/about"
          className="hover:text-gray-300"
        >
          About
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar