import React from "react";
import Product from "./Product";
import styles from "./ProductList.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';



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
      left: "2%", 
      display: currentSlide === 0 ? "none" : "block"
      
    }}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </div>
);


const ProductList = ({ products }) => {
  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const key = product.category;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {});


 
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
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          arrows: false
      
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };

  
  return (
    <div className={styles.productListContainer}>
      {Object.entries(productsByCategory).map(([category, products]) => (
        <React.Fragment key={category}>
          <h2 className={styles.categoryTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          
          <Slider {...settings}>
            {products.map((product, index) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </Slider>

        </React.Fragment>
      ))}
    </div>
  );
};
  

  export default ProductList;