import { Link } from "react-router-dom";

function ProductCard({ id, name, price, image }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <Link
      to={`/product/${id}`}
      className="flex flex-col h-full bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
    >
      {/* Gambar */}
      <div className="h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>

      {/* Informasi produk */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>

        <p className="font-bold text-lg text-blue-600">{price}</p>
      </div>

      {/* Tombol */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-5"
      >
        Keranjang
      </button>
    </Link>
  );
}

export default ProductCard;
