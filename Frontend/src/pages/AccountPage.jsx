import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import accountStyles from './AccountPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faSignOutAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getAccountDetails, getOrders, updateAccount, logout } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const AccountPage = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('orders');
    //const [accountDetails, setAccountDetails] = useState(null);
    const [orders, setOrders] = useState(null);
    const [error, setError] = useState('');
    const { logOut } = useAuth();

    const viewNames = {
      //  'account': 'Account Details',
        'orders': 'My Orders',
     //   'edit': 'Edit Account'
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(''); // Clear any previous errors

                const token = localStorage.getItem('token'); // Get the token from localStorage

                if (view === 'account') {
                    const details = await getAccountDetails(token);
                    setAccountDetails(details);
                } else if (view === 'orders') {
                    const orderHistory = await getOrders(token);
                    setOrders(orderHistory);
                }
            } catch (err) {
                setError(err.message || 'An error occurred');
            }
        };

        fetchData();
    }, [view]);

    const handleLogout = async () => {
        logOut(); // Use logOut function from AuthContext
        setOrders([]); // Clear the orders
        navigate('/login');
    };

    /*
    const renderAccountDetails = () => {
        if (error) return <div>Error: {error}</div>;
        if (!accountDetails) return <div>Loading account details...</div>;
        return <pre>{JSON.stringify(accountDetails, null, 2)}</pre>;
    };
*/
const renderOrders = () => {
    if (error) return <div>Error: {error}</div>;
    if (!orders) return <div>Loading orders...</div>;
    if (orders.length === 0) return <div>No orders have been made.</div>;
  
    // Sort orders by createdAt date in descending order
    const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
    return (
      <div>
        {sortedOrders.map((order) => (
          <div key={order._id} className={accountStyles.orderItem}>
            <h3>Order ID: {order._id}</h3>
            {order.orderItems && Array.isArray(order.orderItems) ? order.orderItems.map((item, index) => (
              <div key={index} className={accountStyles.productDetails}>
                <p><strong>Product Name:</strong> {item.name}</p>
                <p><strong>Quantity:</strong> {item.qty}</p>
                <p><strong>Price:</strong> {item.price} kr</p>
              </div>
            )) : <p>No items in this order.</p>}
            {/* Calculate and display total price */}
            <p className={accountStyles.orderTotalPrice}>
              <strong>Total Price:</strong> {
                order.orderItems.reduce((acc, item) => acc + (item.qty * item.price), 0)
              } kr
            </p>
            <p className={accountStyles.orderItemDate}>
              <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    );
  };

    const EditAccount = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (event) => {
            event.preventDefault();
            updateAccount({ email, password });
        };

        return (
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Update Account</button>
            </form>
        );
    };

    return (
        <div className={accountStyles.container}>
            <div className={accountStyles.leftPanel}>
            {/* Comment out or remove the "Account Details" button */}
      {/*
      <button onClick={() => setView('account')} className={`${accountStyles.loginRegisterButton} ${view === 'account' ? accountStyles.active : ''}`}>
        <FontAwesomeIcon icon={faUserEdit} /><span className={accountStyles.buttonText}> Account Details</span>
      </button>
      */}
      <button onClick={() => setView('orders')} className={`${accountStyles.loginRegisterButton} ${view === 'orders' ? accountStyles.active : ''}`}>
        <FontAwesomeIcon icon={faShoppingCart} /><span className={accountStyles.buttonText}> Orders</span>
      </button>
      {/* Comment out or remove the "Edit Account" button */}
      {/*
      <button onClick={() => setView('edit')} className={`${accountStyles.loginRegisterButton} ${view === 'edit' ? accountStyles.active : ''}`}>
        <FontAwesomeIcon icon={faUserEdit} /><span className={accountStyles.buttonText}> Edit Account</span>
      </button>
      */}
<button onClick={handleLogout} className={accountStyles.loginRegisterButton}>
  <FontAwesomeIcon icon={faSignOutAlt} /><span className={accountStyles.buttonText}> Log Out</span>
</button>
            </div>
            <div className={accountStyles.rightPanel}>
                <h1>{viewNames[view]}</h1>
                {view === 'account' && renderAccountDetails()}
                {view === 'orders' && renderOrders()}
                {view === 'edit' && <EditAccount />}
            </div>
        </div>
    );
};

export default AccountPage;