import { useState } from "react";
import { Link } from "react-router-dom";

function Checkout() {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [cart] = useState(savedCart);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "",
  });

  const [orderSuccess, setOrderSuccess] = useState(false);

  const getPrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      return Number(price.replace(/[^0-9]/g, "")) || 0;
    }
    return 0;
  };

  const formatRupiah = (number) => {
    return `Rp${number.toLocaleString("id-ID")}`;
  };

  const total = cart.reduce(
    (sum, item) => sum + getPrice(item.price) * (item.quantity || 1),
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.removeItem("cart");

    window.dispatchEvent(new Event("cartUpdated"));

    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ✓
          </div>

          <h1 className="text-3xl font-bold mb-3">Pesanan Berhasil!</h1>

          <p className="text-gray-600 mb-8">
            Terima kasih. Pesanan Anda berhasil dibuat.
          </p>

          <div className="bg-gray-50 rounded-lg p-5 mb-8 text-left">
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Jumlah Produk</span>

              <span className="font-semibold">{totalItems}</span>
            </div>

            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold">Total Pesanan</span>

              <span className="font-bold text-blue-600">
                {formatRupiah(total)}
              </span>
            </div>
          </div>

          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Kembali ke Home
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h1 className="text-2xl font-bold mb-3">Keranjang Kosong</h1>

          <p className="text-gray-600 mb-6">
            Anda belum memiliki produk untuk checkout.
          </p>

          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Kembali Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Checkout</h1>

      <p className="text-gray-600 mb-8">
        Lengkapi data untuk menyelesaikan pesanan.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* DATA PEMBELI */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-6">Data Pembeli</h2>

              <div className="space-y-5">
                {/* NAMA */}
                <div>
                  <label className="block font-semibold mb-2">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* TELEPON */}
                <div>
                  <label className="block font-semibold mb-2">Nomor HP</label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* ALAMAT */}
                <div>
                  <label className="block font-semibold mb-2">
                    Alamat Pengiriman
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Masukkan alamat lengkap"
                    rows="4"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* PEMBAYARAN */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-6">Metode Pembayaran</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="Transfer Bank"
                    checked={form.payment === "Transfer Bank"}
                    onChange={handleChange}
                    required
                  />

                  <span className="font-medium">Transfer Bank</span>
                </label>

                <label className="flex items-center gap-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={form.payment === "COD"}
                    onChange={handleChange}
                  />

                  <span className="font-medium">Cash on Delivery (COD)</span>
                </label>

                <label className="flex items-center gap-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="E-Wallet"
                    checked={form.payment === "E-Wallet"}
                    onChange={handleChange}
                  />

                  <span className="font-medium">E-Wallet</span>
                </label>
              </div>
            </div>
          </div>

          {/* RINGKASAN PESANAN */}
          <div>
            <div className="bg-white rounded-xl shadow p-6 md:sticky md:top-6">
              <h2 className="text-xl font-bold mb-6">Ringkasan Pesanan</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4">
                    <div>
                      <p className="font-semibold">{item.name}</p>

                      <p className="text-sm text-gray-500">
                        {item.quantity || 1} ×{" "}
                        {typeof item.price === "string" && item.price.startsWith("Rp")
                          ? item.price
                          : formatRupiah(getPrice(item.price))}
                      </p>
                    </div>

                    <p className="font-semibold">
                      {formatRupiah(
                        getPrice(item.price) * (item.quantity || 1),
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Jumlah Produk</span>

                  <span className="font-semibold">{totalItems}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-bold">Total</span>

                  <span className="font-bold text-xl text-blue-600">
                    {formatRupiah(total)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-blue-700"
              >
                Buat Pesanan
              </button>

              <Link
                to="/cart"
                className="block text-center mt-4 text-gray-600 hover:text-blue-600"
              >
                ← Kembali ke Keranjang
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
