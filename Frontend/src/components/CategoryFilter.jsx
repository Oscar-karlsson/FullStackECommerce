import React, { useState, useEffect } from 'react';
import styles from './CategoryFilter.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CategoryFilter = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(['All']);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (Array.isArray(categories)) {
      setVisibleCategories(showMore ? categories : categories.slice(0, 5));
    }
  }, [categories, showMore]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          const categories = [...new Set(data.map(product => product.category))];
          setCategories(['All', ...categories]);
        } else {
          console.error('Data is not an array:', data);
        }
      } else {
        console.error('Expected JSON but received:', contentType);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleCategoryClick = (event, category) => {
    event.preventDefault();
    setSelectedCategories(prevSelectedCategories => {
      let newSelectedCategories;
      if (category === 'All') {
        newSelectedCategories = prevSelectedCategories.includes('All') ? [] : ['All'];
      } else {
        newSelectedCategories = prevSelectedCategories.includes(category) 
          ? prevSelectedCategories.filter(c => c !== category)
          : [...prevSelectedCategories, category];
        if (newSelectedCategories.includes('All')) {
          newSelectedCategories = newSelectedCategories.filter(c => c !== 'All');
        }
        if (newSelectedCategories.length === 0) {
          newSelectedCategories = ['All'];
        }
      }
      onCategoryChange(newSelectedCategories); // Call the callback function
      return newSelectedCategories;
    });
  };

  const handleReset = () => {
    setSelectedCategories(['All']);
    onCategoryChange(['All']); // Call the callback function
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Filter by category</h3>
      <button className={styles.toggleButton} onClick={handleShowMore}>
        <FontAwesomeIcon icon={showMore ? faChevronUp : faChevronDown} />
      </button>
      <div className={`${styles.categoryList} ${showMore ? styles.visible : ''}`}>
        <ul>
        {visibleCategories.map((category, index) => (
  <li key={index} 
      className={styles.categoryItem} 
      onClick={(event) => handleCategoryClick(event, category)}>
    <input type="checkbox" 
           checked={selectedCategories.includes(category)} 
           readOnly />
    {category === 'All' ? 'Alla kategorier' : category.charAt(0).toUpperCase() + category.slice(1)}
  </li>
))}
        </ul>
        <div className={styles.resetButtonContainer}>
          <button className={styles.resetButton} onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
