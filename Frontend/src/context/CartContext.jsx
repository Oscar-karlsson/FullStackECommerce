import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    // Initialize the cart from local storage
    const [cart, setCart] = useState(() => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    });
    

// useEffect for updating local storage when cart changes
useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);
    

const addToCart = (productToAdd) => {
    setCart(prevCart => {
      // Ensure productToAdd.quantity is a number
      const quantityToAdd = Number(productToAdd.quantity) || 1; // Default to 1 if not a number
  
      const existingProductIndex = prevCart.findIndex(item => item.id === productToAdd._id);
  
      if (existingProductIndex >= 0) {
        // Product is already in the cart, update the quantity
        const updatedCart = prevCart.map((item, index) => {
          if (index === existingProductIndex) {
            // Ensure item.quantity is a number
            const currentQuantity = Number(item.quantity) || 0;
            return { ...item, quantity: currentQuantity + quantityToAdd };
          }
          return item;
        });
        return updatedCart;
      } else {
        // Product is not in the cart, add it
        return [...prevCart, { ...productToAdd, id: productToAdd._id, quantity: quantityToAdd }];
      }
    });
  };

    const removeFromCart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart(prevCart => 
            prevCart.map(item => 
                item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
            )
        );
    };

    return (
      <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity }}>
      {children}
  </CartContext.Provider>
    );
};