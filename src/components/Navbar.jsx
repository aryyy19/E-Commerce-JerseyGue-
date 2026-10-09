import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      setCartCount(cart.length);
    };

    // Jalankan saat pertama kali Navbar dibuka
    updateCartCount();

    // Dengarkan perubahan cart
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          JerseyGue
        </Link>

        {/* Hamburger button - hanya tampil di mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

        {/* Nav links - tampil horizontal di md ke atas, dropdown di mobile */}
        <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-16 left-0 right-0 md:top-auto bg-blue-600 md:bg-transparent px-6 md:px-0 py-4 md:py-0 gap-4 md:gap-6 items-start md:items-center z-50`}>
          <Link
            to="/"
            className="hover:text-blue-200"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="hover:text-blue-200 relative"
            onClick={() => setMenuOpen(false)}
          >
            Keranjang
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/checkout"
            className="hover:text-blue-200"
            onClick={() => setMenuOpen(false)}
          >
            Checkout
          </Link>

          <Link
            to="/admin/dashboard"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
            onClick={() => setMenuOpen(false)}
          >
            Login Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
