import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const mergedCart = [];

    savedCart.forEach((item) => {
      const existing = mergedCart.find((product) => product.id === item.id);

      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        mergedCart.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }
    });

    setCart(mergedCart);

    localStorage.setItem("cart", JSON.stringify(mergedCart));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    saveCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const removeProduct = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    saveCart(updatedCart);
  };

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
    (sum, item) => sum + getPrice(item.price) * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Keranjang Belanja</h1>

      <p className="text-gray-600 mb-8">Periksa produk yang ingin Anda beli.</p>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold mb-2">Keranjang masih kosong</h2>

          <p className="text-gray-600 mb-6">
            Silakan pilih produk terlebih dahulu.
          </p>

          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PRODUK */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const subtotal = getPrice(item.price) * item.quantity;

              return (
                <div key={item.id} className="bg-white rounded-xl shadow p-5">
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* GAMBAR */}
                    <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* INFORMASI */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h2 className="text-xl font-bold">{item.name}</h2>

                          <p className="text-sm text-gray-500 mt-1">
                            {item.category}
                          </p>
                        </div>

                        <button
                          onClick={() => removeProduct(item.id)}
                          className="text-red-500 hover:text-red-700 font-semibold"
                        >
                          Hapus
                        </button>
                      </div>

                      <p className="text-blue-600 font-bold text-lg mt-4">
                        {typeof item.price === "string" && item.price.startsWith("Rp")
                          ? item.price
                          : formatRupiah(getPrice(item.price))}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
                        {/* JUMLAH */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-10 h-10 hover:bg-gray-100"
                          >
                            −
                          </button>

                          <span className="w-10 text-center font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-10 h-10 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        {/* SUBTOTAL */}
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Subtotal</p>

                          <p className="font-bold text-lg">
                            {formatRupiah(subtotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RINGKASAN */}
          <div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-6">Ringkasan Pesanan</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Jumlah Produk</span>

                  <span className="font-semibold">{totalItems}</span>
                </div>

                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold">Total</span>

                  <span className="font-bold text-xl text-blue-600">
                    {formatRupiah(total)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block text-center bg-blue-600 text-white w-full py-3 rounded-lg mt-6 font-semibold hover:bg-blue-700"
              >
                Checkout
              </Link>

              <Link
                to="/"
                className="block text-center mt-4 text-gray-600 hover:text-blue-600"
              >
                ← Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
