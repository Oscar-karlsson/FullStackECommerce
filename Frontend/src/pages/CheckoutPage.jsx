import React, { useContext, useState } from 'react';
import styles from './CheckoutPage.module.css'; 
import { CartContext } from '../context/CartContext';
import cartStyles from './CartPage.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({ name: '', address: '', email: '' });
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleInputChange = (event, setter) => {
    const { name, value } = event.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const submitOrder = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, {
        products: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      });
      if (response.status === 201) {
        setIsOrderPlaced(true);
        clearCart();
      }
    } catch (error) {
      console.error('There was an error placing the order: ', error);
    }
  };

  if (isOrderPlaced) {
    return <div className={styles.orderConfirmation}>Your order has been placed successfully!</div>;
  }

  return (
    <div className={cartStyles.wrap}>
      <h1 className={cartStyles.projTitle}>Checkout</h1>
      <div className={cartStyles.heading}>
        <h1>Order Summary</h1>
        <button className={cartStyles.continue} onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
      <div className={cartStyles.cart}>
        <ul className={cartStyles.cartWrap}>
          {cart.map((item, index) => (
            <li key={index} className={cartStyles.itemsOdd}>
              <div className={cartStyles.infoWrap}>
                <div className={cartStyles.cartSection}>
                  <img src={item.images[0]} alt={item.name} className={cartStyles.itemImg} />
                  <div className={cartStyles.itemInfo}>
                    <h3>{item.name}</h3>
                    <div className={cartStyles.priceQty}>
                      <p className={cartStyles.qty}>Quantity: {item.quantity}</p>
                      <p>Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={cartStyles.customerInfo}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={customerInfo.name}
          onChange={e => handleInputChange(e, setCustomerInfo)}
          className={cartStyles.inputField}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={customerInfo.address}
          onChange={e => handleInputChange(e, setCustomerInfo)}
          className={cartStyles.inputField}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customerInfo.email}
          onChange={e => handleInputChange(e, setCustomerInfo)}
          className={cartStyles.inputField}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={customerInfo.phone}
          onChange={e => handleInputChange(e, setCustomerInfo)}
          className={cartStyles.inputField}
        />
      </div>
      <div className={cartStyles.checkoutArea}>
        <button className={cartStyles.checkoutButton} onClick={() => navigate('/payment')}>Proceed to Payment</button>
      </div>
    </div>
  );
}

export default CheckoutPage;
