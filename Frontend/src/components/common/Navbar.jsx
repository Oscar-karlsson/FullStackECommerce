import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';
import SearchBar from '../SearchBar';
import { CartContext } from '../../context/CartContext';
import { AuthProvider, useAuth } from '../../context/AuthContext';





const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Get isLoggedIn from useAuth

  const handleClickOutside = (e) => {
    if (node.current && !node.current.contains(e.target) && !e.target.closest(`.${styles.navbarLinks}`)) {
      setIsOpen(false);
      document.body.style.overflow = 'auto'; // Allow scrolling when the menu is closed
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; // Allow scrolling when the menu is closed
  };
  

  const handleAccountIconClick = () => {
    if (isLoggedIn) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const { cart } = useContext(CartContext);

const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

const [key, setKey] = useState(0);

const toggleMenu = () => {
  setIsOpen(!isOpen);
  if (!isOpen) {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when the menu is opened
  } else {
    document.body.style.overflow = 'auto'; // Allow scrolling when the menu is closed
  }
};

  

return (
  <nav className={styles.navbar}>
    <div className={styles.topRow}>
    <NavLink to="/" className={styles.logo}>
  <img 
    src={window.innerWidth <= 375 ? "../src/assets/logo.png" : "../src/assets/logo-text.png"} 
    alt="TechStore Logo" 
    style={{ height: '50px', width: 'auto' }} 
  />
</NavLink>
      
      <div className={styles.searchBar}>
        <SearchBar />
      </div>

      <div className={styles.rightSide}>
        <div className={styles.navbarIcons}>
        <FontAwesomeIcon icon={faUser} onClick={handleAccountIconClick} />
          <Link to="/cart" className={styles.cartIcon}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItemCount > 0 && (
              <span className={styles.cartItemCount}>{cartItemCount > 99 ? '99+' : cartItemCount}</span>
            )}
          </Link>
        </div>

        <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu} ref={node}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <ul className={`${styles.navbarLinks} ${isOpen ? styles.showMenu : ''}`}>
      <li><NavLink to="/alla-produkter" onClick={closeMenu}>Alla Produkter</NavLink></li>
      <li><NavLink to="/kontakta-oss" onClick={closeMenu}>Kontakta oss</NavLink></li>
      <li><NavLink to="/om-oss" onClick={closeMenu}>Om oss</NavLink></li>
    </ul>
  </nav>
);}

export default Navbar;