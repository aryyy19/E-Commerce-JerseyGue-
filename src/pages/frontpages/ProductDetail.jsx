import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import products from "../../data/products";

function ProductDetail() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>

          <p className="text-gray-600 mb-6">
            Produk yang Anda cari tidak ditemukan.
          </p>

          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Kembali ke Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>

        <span className="mx-2 text-gray-400">/</span>

        <span className="text-gray-600">Detail Produk</span>
      </div>

      {/* Product Detail */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gambar */}
          <div className="bg-gray-100 p-6">
            <div className="bg-gray-100 rounded-xl h-96 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Informasi */}
          <div className="p-5 md:p-8 flex flex-col">
            <span className="text-sm text-blue-600 font-semibold mb-3">
              {product.category}
            </span>

            <h1 className="text-2xl md:text-4xl font-bold mb-4">{product.name}</h1>

            <p className="text-xl md:text-2xl font-bold text-blue-600 mb-6">
              {product.price}
            </p>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-3">Deskripsi Produk</h2>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tombol */}
            <div className="mt-auto pt-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Tambah ke Keranjang
              </button>

              <Link
                to="/cart"
                className="block text-center mt-4 text-blue-600 hover:underline"
              >
                Lihat Keranjang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
