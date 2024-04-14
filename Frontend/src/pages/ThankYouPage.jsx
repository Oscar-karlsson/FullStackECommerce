import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ThankYouPage.module.css'; 


const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  // Function to handle the "Back to Shop" button click
  const onBackToShop = () => {
      navigate('/'); 
  };


    return (
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.messageRow}>
            <div className={styles.messageBox}>
              <div className={styles.successContainer}>
                <img
                    src="../src/assets/logo.png" 
                    alt="Thank You"
                    className={styles.thankYouImage}
                />
                <div className={styles.hrContainer}>
                  <hr />
                </div>
                <h1 className={styles.thankYouTitle}>Thank you for your order</h1>
                <div className={styles.confirmationBox}>
                                <h5>ORDER CONFIRMATION</h5>
                                <p>Your order #{orderId} has been successful!</p>
                                <p>Thank you for choosing our service. You will shortly receive a confirmation email.</p>
                            </div>
                <button
                  className={styles.backToShopButton}
                  onClick={onBackToShop}
                >
                  Back to shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ThankYouPage