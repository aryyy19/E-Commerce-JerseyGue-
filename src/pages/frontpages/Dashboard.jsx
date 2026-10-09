import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import products from "../../data/products";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const categories = ["Semua", "Jersey Home", "Jersey Away"];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "Semua" || product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* HERO */}
      <section className="bg-blue-600 text-white rounded-xl p-6 md:p-8 mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-3">Selamat Datang di JerseyGue</h1>

        <p className="text-blue-100">Temukan jersey tim kesayangan anda.</p>
      </section>

      {/* FILTER */}
      <section className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">Cari Produk</label>

            <input
              type="text"
              placeholder="Cari nama produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Kategori</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* PRODUK */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Daftar Produk</h2>

        {filteredProducts.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600">Produk tidak ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
