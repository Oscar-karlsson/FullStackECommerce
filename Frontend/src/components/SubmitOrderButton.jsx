import React, { useState } from 'react';
import styles from "../pages/CartPage.module.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SubmitOrderButton = ({ cartItems, userToken, onSubmitSuccess }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const submitOrder = async (event) => {
      event.preventDefault();
      
      const orderData = {
          products: cartItems.map(item => ({
              productId: item.id,
              quantity: item.quantity,
          })),
      };

      try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userToken}`,
              },
              body: JSON.stringify(orderData),
          });

      
          if (response.ok) {
            const responseData = await response.json();
            onSubmitSuccess(responseData.order._id); // Pass order ID to callback
        } else {
            setErrorMessage('An error occurred while submitting your order.');
        }
    } catch (error) {
        console.error('Error submitting order:', error);
        setErrorMessage('An error occurred while submitting your order.');
    }
};

 
  return (
    <>
      <button type="submit" onClick={submitOrder} className={styles.btn}>Submit Order</button>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  );
};

export default SubmitOrderButton;