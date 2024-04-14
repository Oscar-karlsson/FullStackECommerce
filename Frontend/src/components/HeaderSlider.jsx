import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from './HeaderSlider.module.css'; // Import CSS as a module
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';



const API_BASE_URL = import.meta.env.VITE_API_URL;

const HeaderSlider = ({ category }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleBuyNowClick = async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
      const productDetails = response.data;
  
      // Log for debugging
      console.log(productDetails);
  
      // Check if the product has a price property; adjust according to your API structure
      if (productDetails.price === undefined) {
        console.error('Product details do not include a price property');
        // Handle the missing price case, e.g., show an error message to the user
        return;
      }
  
      addToCart({
        ...productDetails,
        quantity: 1 // Assume you're adding one item of the product
      });
  
      navigate('/cart');
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
const slides = [
    {
      image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202302/14649_samsung_s23-ultra_1-2-2023_1200x675-sixteen_nine.jpg?VersionId=11lWDaf3FVEq35iFvPeCQOod65Aj0cjD',
      title: '',
      buyNowButton: 'Buy Now',
      readMoreButton: 'Read More',
      path: '/66106a6bcc4a70a088ce9ff2',
      productId: '66106a6bcc4a70a088ce9ff2',
    },
    {
      image: 'https://media.wired.com/photos/6500ad57fe61eb702d721b58/master/pass/Apple-iPhone-15-Pro-Hero-Gear.jpg',
      title: 'Upptäck iPhone 15 Pro',
      buyNowButton: 'Buy Now',
      readMoreButton: 'Read More',
      path: '/66106a6bcc4a70a088ce9ff2',
      productId: '66106a6bcc4a70a088ce9ff2'
    },
    {
      image: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/13e20795-3b08-4c92-b3ec-e77638c9783d.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
      title: '',
      buyNowButton: 'Buy Now',
      readMoreButton: 'Read More',
      path: '/66106a6bcc4a70a088ce9ff2',
      productId: '66106a6bcc4a70a088ce9ff2'
    },
    // Add more slides as needed
  ];

  return (
    <div className={styles.carouselContainer}>
     <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay interval={6000}>
  {slides.map((slide, index) => (
    <div key={index} className={styles.customSlide}>
      <img src={slide.image} alt={slide.title} className={styles.customCarouselImage} />
      <div className={styles.customLegend}>
        <h2 className={styles.customTitle}>{slide.title}</h2>
        <div className={styles.buttonContainer}>
        <button onClick={() => handleBuyNowClick(slide.productId)} className={styles.buyNowButton}>{slide.buyNowButton}</button>
              <Link to={slide.path} className={styles.readMoreButton}>{slide.readMoreButton}</Link>
            </div>
      </div>
    </div>
  ))}
</Carousel>
    </div>
  );
};

export default HeaderSlider;