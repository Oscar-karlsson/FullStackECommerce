import React, { useState, useEffect, useContext } from 'react';
import styles from './ProductPage.module.css';
import productStyles from '../components/Product.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { CartContext } from '../context/CartContext';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';





const API_BASE_URL = import.meta.env.VITE_API_URL;
const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;
const INITIAL_VISIBLE_COUNT = 10;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(INITIAL_VISIBLE_COUNT);
  const { addToCart } = useContext(CartContext);
  
  
  const handleCategoryChange = (selectedCategories) => {
    const filteredProducts = selectedCategories.includes('All') 
      ? products 
      : products.filter(product => selectedCategories.includes(product.category));
    setFilteredProducts(filteredProducts);
  };
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${searchTerm}`);
    }
  };
  

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setCategories([...new Set(data.map(product => product.category))]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);




  

  const handleProductClick = (productId) => {
    // Navigate to the product details page
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevents the click from triggering the navigation
    addToCart(product); // Add the product to the cart
};

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Filter products by category when selectedCategory changes
  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.page}>
      <CategoryFilter onCategoryChange={handleCategoryChange} />
      <div className={styles.productsGrid}>
        {filteredProducts.map(product => {
          const imageUrl = product.images.length > 0 
          ? `${IMG_BASE_URL}/${product.images[0].replace(/\\/g, '/')}` 
          : '/path-to-default-image.jpg';
          return (
            <ProductCard 
              key={product._id} 
              product={product} 
              imageUrl={imageUrl}
              handleProductClick={() => handleProductClick(product._id)} 
              handleAddToCart={(e) => handleAddToCart(product, e)}
            />
          );
        })}
      </div>
    </div>
  );
};


export default ProductPage;