import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import ProductDetail from './components/ProductDetail';
import Footer from './components/common/Footer';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';
import Loading from './components/Loading';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import LoginRegister from './components/LoginRegister';
import AccountPage from './pages/AccountPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import AboutPage from './pages/AboutPage';
import '../styles/variables.css';





function App() {
  const [isLoading, setIsLoading] = useState(true);


  

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);



  return (
    <AuthProvider>
    <CartProvider>
    <Router>
      <Navbar />
      {isLoading ? (
        <Loading /> 
      ) : (
        <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Kontakta-oss" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/alla-produkter/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/om-oss" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      </>
      )}
    </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;

