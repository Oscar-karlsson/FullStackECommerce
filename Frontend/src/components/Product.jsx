import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../context/CartContext";
import ProductCard from './ProductCard';


const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;

const Product = ({ product }) => {
  const imageUrl = product.images.length > 0 
    ? `${IMG_BASE_URL}/${product.images[0].replace(/\\/g, '/')}` 
    : '/path-to-default-image.jpg';
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  const handleProductClick = () => {
    // Navigate to product detail page
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents the click from triggering the navigation
    addToCart(product); // Add the product to the cart
  };

  return (
    <ProductCard 
      product={product} 
      imageUrl={imageUrl} 
      handleProductClick={handleProductClick} 
      handleAddToCart={handleAddToCart} 
    />
  );
};

export default Product;