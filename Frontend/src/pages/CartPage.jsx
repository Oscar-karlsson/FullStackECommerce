import React, { useContext, useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css'; 
import { CartContext } from '../context/CartContext';
import SubmitOrderButton from '../components/SubmitOrderButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;


const CartPage = () => {
  const { cart, setCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const [isShippingDifferent, setIsShippingDifferent] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const userToken = localStorage.getItem('token');
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  


 const toggleShippingDifferent = () => {
   setIsShippingDifferent(!isShippingDifferent);
 };
  
  


  // New code: Initialize form data from localStorage
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem('checkoutData')) || {}
  );

  // New code: Update localStorage whenever form data changes
  useEffect(() => {
    localStorage.setItem('checkoutData', JSON.stringify(formData));
  }, [formData]);

  // New code: Handle form input changes
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  


  // Callback function for handling successful submission
  const handleSubmitSuccess = (orderId) => {
    setCart([]); // Clear the cart
    setFormData({}); // Reset form data
    localStorage.removeItem('checkoutData');
    navigate("/thank-you", { state: { orderId } }); // Navigate with order ID
};

  

  const handleQuantityChange = (id, newQuantity) => {
    // Ensure that newQuantity is a valid number
    const parsedQuantity = parseInt(newQuantity);
  
    // Define the maximum quantity per item
    const maxQuantityPerItem = 50;
  
    if (!isNaN(parsedQuantity) && parsedQuantity >= 0 && parsedQuantity <= maxQuantityPerItem) {
      // Call updateQuantity with the valid quantity
      updateQuantity(id, parsedQuantity);
    } else if (parsedQuantity > maxQuantityPerItem) {
      // If the quantity exceeds the maximum, set it to the maximum
      updateQuantity(id, maxQuantityPerItem);
    }
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
};

const [showCheckout, setShowCheckout] = useState(false);

  // Calculate Subtotal, Shipping, Tax, and Total
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = totalPrice > 500 ? 0 : 50;
  const tax = totalPrice * 0.25;
  const total = subtotal + shipping + tax;


  if (cart.length === 0) {
    return (
      <div className={styles.emptyCartContainer}>
        <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
        <p className={styles.emptyCartMessage}>Looks like you haven't added any products to your cart yet.</p>
        <button onClick={() => navigate('/')} className={styles.btn}>
          Continue Shopping
        </button>
      </div>
    );
  }


  return (
    <div className={styles.wrap}>
      <h1 className={styles.projTitle}>
        My<span className={styles.less}>Shopping</span>  Cart
      </h1>
      <div className={styles.heading}>
        <h1>Review and Checkout</h1>
        <button className={styles.continue} onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
      <div className={styles.cart}>
        <ul className={styles.cartWrap}>
          {cart.map((item) => (
            <li key={item.id} className={styles.itemsOdd}>
    <div className={styles.infoWrap}>
  <div className={styles.cartSection}>
  <img src={`${IMG_BASE_URL}/${item.images?.[0] ?? 'defaultImage.jpg'}`} alt={item.name} className={styles.itemImg} />
    <div className={styles.itemInfo}>                 
      <h3>{item.name}</h3>
      <div className={styles.priceQty}>
        <input
          type="text"
          className={styles.qty}
          value={item.quantity}
          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
        />
        <p>x {item.price.toFixed(2)} kr</p>
        <p className={styles.stockStatus}>In Stock</p>
      </div>
    </div>
    <div className={styles.prodTotalRemoveWrap}> 
      <div className={styles.prodTotal}>
        <p>{(item.price * item.quantity).toFixed(2)} kr</p>
      </div>
      <div className={styles.removeWrap}>
        <a
          href="#"
          className={styles.remove}
          onClick={(e) => {
            e.preventDefault();
            handleRemoveFromCart(item.id);
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </a>
      </div>
    </div>
  </div>
</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.checkoutArea}>
        {/* Promo Code Section */}
        <div className={styles.promoCode}>
  <label htmlFor="promo">Have A Promo Code?</label>
  <div className={styles.inputButtonContainer}>
    <input type="text" name="promo" placeholder="Enter Code" />
    <a href="#" className={styles.btn}>Apply</a>
  </div>
</div>
  
        {/* Subtotal, Shipping, Tax, Total Display */}
        <div className={styles.summary}>
          <div className={styles.item}>
            <span className={styles.label}>Subtotal</span>
            <span className={styles.value}>{subtotal.toFixed(2)} kr</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Shipping</span>
            <span className={styles.value}>{shipping.toFixed(2)} kr</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Tax</span>
            <span className={styles.value}>{tax.toFixed(2)} kr</span>
          </div>
          <div className={styles.item}>
            <span className={`${styles.label} ${styles.totalLabel}`}>Total</span>
            <span className={styles.value}>{total.toFixed(2)} kr</span>
          </div>
          <button className={styles.checkoutButton} onClick={() => setShowCheckout(!showCheckout)}>Checkout</button>
        </div>
      </div>
      {/* Checkout Content */}
      {showCheckout && (
        <div className={styles.checkout}>
          <h2>Checkout Form</h2>
          <form>
      <h3>Billing Address</h3>
      <label>
        Full Name:
        <input type="text" name="name"
         value={formData.name || ''}
         onChange={handleInputChange}
         />
      </label>
      <label>
        Email:
        <input type="email" name="email" 
         value={formData.email || ''}
         onChange={handleInputChange}/>
        
      </label>
      <label>
        Address:
        <input type="text" name="address" 
         value={formData.address || ''}
         onChange={handleInputChange}/>
      </label>
      <label>
        City:
        <input type="text" name="city"
         value={formData.city || ''}
         onChange={handleInputChange} />
      </label>
      <label>
        Zip:
        <input type="text" name="zip"
         value={formData.zip || ''}
         onChange={handleInputChange} />
      </label>

       {/* New code: Button to toggle whether shipping address is different */}
       <button 
  type="button" 
  onClick={toggleShippingDifferent}
  className={styles.toggleButton} 
>
  {isShippingDifferent ? 'Same as Billing Address' : 'Different Shipping Address'}
</button>

{isShippingDifferent && (
  <>
    <h3>Shipping Address</h3>
    <label>
        Full Name:
        <input type="text" name="name"
         value={formData.name || ''}
         onChange={handleInputChange}
         />
      </label>
    <label>
      Address:
      <input 
        type="text" 
        name="shipping_address"
        value={formData.shipping_address || ''}
        onChange={handleInputChange}
      />
    </label>
    <label>
      City:
      <input 
        type="text" 
        name="shipping_city"
        value={formData.shipping_city || ''}
        onChange={handleInputChange}
      />
    </label>
    <label>
        Zip:
        <input type="text" name="zip"
         value={formData.zip || ''}
         onChange={handleInputChange} />
      </label>
    <label>
      Country:
      <input 
        type="text" 
        name="shipping_country"
        value={formData.shipping_country || ''}
        onChange={handleInputChange}
      />
    </label>
  </>
)}

      <h3>Payment Information</h3>
      <label>
        Name on Card:
        <input type="text" name="card_name"
         value={formData.card_name || ''}
         onChange={handleInputChange} />
      </label>
      <label>
        Credit card number:
        <input type="text" name="card_number"
         value={formData.card_number || ''}
         onChange={handleInputChange} />
      </label>
      <label>
  Expiration date:
  <div className={styles['expiration-date']}>
    <select className={styles['month-select']} name="card_expiration_month" value={formData.card_expiration_month || ''} onChange={handleInputChange}>
      <option value="">Month</option>
      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
        const monthName = new Date(0, month - 1).toLocaleString('default', { month: 'long' });
        return (
          <option key={month} value={month}>
            {monthName}
          </option>
        );
      })}
    </select>
    <select className={styles['year-select']} name="card_expiration_year" value={formData.card_expiration_year || ''} onChange={handleInputChange}>
      <option value="">Year</option>
      {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
</label>
      <label>
        CVV:
        <input type="text" name="card_cvv"
        value={formData.card_cvv || ''}
        onChange={handleInputChange} />
      </label>

      <h3>Review Order</h3>
     
      
      <SubmitOrderButton 
  cartItems={cart} 
  userToken={userToken} 
  onSubmitSuccess={handleSubmitSuccess} 
/>
    </form>
        </div>
      )}
    </div>
  );};

export default CartPage;
