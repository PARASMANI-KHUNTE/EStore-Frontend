import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios.get("https://estore-backend-uilc.onrender.com/products").then((res) => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });
  }, []);

  // Filter products based on the selected category
  const handleFilter = (category) => {
    setFilter(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.type === category));
    }
  };

  // Add a product to the cart
  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Update quantity in the cart
  const updateQuantity = (productId, increment) => {
    setCart(
      cart.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: item.quantity + (increment ? 1 : -1),
            }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  // Calculate total price of the cart
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Filter Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <button
            onClick={() => handleFilter("All")}
            className={`px-4 py-2 rounded-lg ${
              filter === "All" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilter("Shoes")}
            className={`px-4 py-2 rounded-lg ml-2 ${
              filter === "Shoes" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Shoes
          </button>
          <button
            onClick={() => handleFilter("Clothing")}
            className={`px-4 py-2 rounded-lg ml-2 ${
              filter === "Clothing" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Clothing
          </button>
        </div>
        {/* Cart Summary */}
        <div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => alert("Proceeding to buy all items!")}
          >
            Buy (${getTotal().toFixed(2)})
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cart</h2>
          <div>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item._id, false)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, true)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right mt-4">
            <h3 className="text-lg font-semibold">
              Total: ${getTotal().toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
