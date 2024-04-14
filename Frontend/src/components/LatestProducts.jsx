import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import productListStyles from './ProductList.module.css';
import styles from './Product.module.css';
import { CartContext } from '../context/CartContext';
import ProductCard from './ProductCard';

const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;

const NextArrow = ({ onClick }) => (
  <div
    style={{ 
      color: "#000", 
      fontSize: "2rem", 
      zIndex: "1", 
      cursor: "pointer", 
      position: "absolute", 
      top: "45%", 
      right: "2%" 
    }}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </div>
);

const PrevArrow = ({ currentSlide, onClick }) => (
  <div
    style={{ 
      color: "#000", 
      fontSize: "2rem", 
      zIndex: "1", 
      cursor: "pointer", 
      position: "absolute", 
      top: "45%", 
      left: "2%"
    }}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </div>
);

const LatestProducts = ({ products }) => {
    // Get the 5 latest products
    const latestProducts = products.slice(0, 10);
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    };
  
    return (
      <div className={productListStyles.productListContainer}>
        <h2 className={productListStyles.categoryTitle}>Nyheter</h2>
        <Slider {...settings}>
        {latestProducts.slice().reverse().map((product) => {
          const imageUrl = product.images.length > 0 
            ? `${IMG_BASE_URL}/${product.images[0].replace(/\\/g, '/')}` 
            : '/path-to-default-image.jpg';
  
            const handleProductClick = () => {
              // Navigate to product detail page
              navigate(`/product/${product._id}`);
            };
  
            const handleAddToCart = (e) => {
              e.stopPropagation(); // Prevents the click from triggering any parent onClick events
              addToCart(product); // Add the product to the cart
            };
  
            return (
              <ProductCard 
                key={product._id} 
                product={product} 
                imageUrl={imageUrl}
                handleProductClick={handleProductClick} 
                handleAddToCart={handleAddToCart} 
              />
            );
          })}
        </Slider>
      </div>
    );
  };

export default LatestProducts;