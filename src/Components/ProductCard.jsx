import React from "react";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-xl font-semibold mt-4 text-gray-800">{product.name}</h2>
      <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
      <button
        onClick={() => handleAddToCart(product)}
        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg text-sm font-medium shadow hover:from-blue-600 hover:to-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
