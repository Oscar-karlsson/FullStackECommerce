// ProductCard.jsx
import React, { useState } from 'react';
import styles from "./ProductCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, imageUrl, handleProductClick, handleAddToCart }) => {
    const [hovered, setHovered] = useState(false);

    const priceParts = product.price.toString().split('.');
    const integerPart = priceParts[0];
    const decimalPart = priceParts[1];

    const handleHover = () => {
        setHovered(true);
    };

    const handleHoverLeave = () => {
        setHovered(false);
    };

    const handleAddToCartClick = (e) => {
        console.log("Event object:", e);
        e.preventDefault(); // Prevent default behavior (redirect)
        e.stopPropagation(); // Prevent event from bubbling up to parent elements
        handleAddToCart(e, product); // Call the function to add to cart
    };

    return (
        <div className={styles.productCard} onClick={() => handleProductClick(product)} tabIndex="0">
            <img src={imageUrl} alt={product.name} />
            <div className={styles.titleAndDescriptionContainer}>
                <h3>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
            </div>
            <div className={styles.priceAndButtonContainer}>
                <button
                    className={`${styles.priceButton} ${hovered ? styles.hovered : ''}`}
                    onClick={handleAddToCartClick}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverLeave}
                >
                    {hovered ? <FontAwesomeIcon icon={faShoppingCart} className={styles.cartIcon} /> : (
                          <span className={styles.price}>
                          <span className={styles.priceSymbol}>$</span>
                          <span className={styles.integerPart}>{integerPart}</span>
                          <span className={styles.decimalPart}>{decimalPart}</span>
                      </span>
                    )}
                    <span className={styles.addToCartText}>
                        Add to Cart
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;