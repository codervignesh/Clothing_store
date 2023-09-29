// TshirtCatalog.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTshirts, addToCart, removeFromCart, decreaseQuantity } from '../../redux/actions'; // Import your Redux actions
import tshirtData from '../catalog.json';
import './Catalog.css';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';

const TshirtCatalog = () => {
  const dispatch = useDispatch();
  const tshirts = useSelector((state) => state.tshirts);
  const cartItems = useSelector((state) => state.cart);
  const [errorMessages, setErrorMessages] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    colors: [],
    gender: [],
    priceRange: [
      { min: 0, max: 250 },
      { min: 251, max: 450 },
      { min: 451, max: Infinity }, // Use Infinity for '> 451'
    ],
    type: [],
  });

  useEffect(() => {
    dispatch(fetchTshirts(tshirtData));
  }, [dispatch]);


  const handleAddToCart = (itemId) => {
    const item = tshirts.find((tshirt) => tshirt.id === itemId);
  
    if (item) {
      const availableQuantity = item.quantity;
      const currentQuantity = cartItems[itemId] || 0;
  
      if (currentQuantity < availableQuantity) {
        dispatch(addToCart(itemId));
        // Clear any error message for this item
        setErrorMessages({
          ...errorMessages,
          [itemId]: '',
        });
      } else {
        // Display an error message
        setErrorMessages({
          ...errorMessages,
          [itemId]: 'Quantity exceeds available stock.',
        });
      }
    }
  };
  

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    setErrorMessages({
      ...errorMessages,
      [itemId]: '',
    });
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId)); // Call decreaseQuantity action
    setErrorMessages({
      ...errorMessages,
      [itemId]: '',
    });
  };

  const filteredTshirts = tshirts.filter((tshirt) => {
    const filterMatches =
    (filters.colors.length === 0 || filters.colors.includes(tshirt.color)) &&
    (filters.gender.length === 0 || filters.gender.includes(tshirt.gender)) &&
    (filters.type.length === 0 || filters.type.includes(tshirt.type));

    const priceInRange = filters.priceRange.some((range) => {
      const { min, max } = range;
      return tshirt.price >= min && tshirt.price <= max;
    });
    return (
      filterMatches && priceInRange && 
      (tshirt.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tshirt.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tshirt.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tshirt.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };
      if (filterType === 'priceRange') {
        // Check if the value already exists in the selected price ranges
        const rangeIndex = prevFilters.priceRange.findIndex((range) =>
          JSON.stringify(range) === JSON.stringify(value)
        );
  
        if (rangeIndex !== -1) {
          // If it exists, remove it
          updatedFilters.priceRange.splice(rangeIndex, 1);
        } else {
          // If it doesn't exist, add it
          updatedFilters.priceRange.push(value);
        }
      } else {
        // Handle other filter types as before
        updatedFilters = {
          ...updatedFilters,
          [filterType]: prevFilters[filterType].includes(value)
            ? prevFilters[filterType].filter((item) => item !== value)
            : [...prevFilters[filterType], value],
        };
      }
      return updatedFilters;
    });
  };
  
  

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      {/* <div className="placeholder"></div> */}
      <div className="navbar">
      <button className="filter-button" onClick={toggleFilters}>
          Filters
      </button>
      </div>
      <div className="search-bar-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for t-shirts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="search-icon">
          {/* You can use your search icon here */}
          🔍
        </span>
      </div>


      <header className="header">
        <Link to="/" className="title">
          TeeRex Store
        </Link>
        <Link to="/cart" className="cart-link">
          <span role="img" aria-label="Cart Icon">
            🛒
          </span>
        </Link>
      </header>
      <div className={`filters ${showFilters ? 'show' : ''}`}>
      <h2> . </h2>
      <div>
        <h3>Colors</h3>
        {/* Create checkboxes for colors */}
        {['Black', 'Blue', 'Pink', 'Green', 'Red', 'Grey', 'Purple', 'White', 'Yellow'].map((color) => (
          <label key={color}>
            <input
              type="checkbox"
              value={color}
              checked={filters.colors.includes(color)}
              onChange={() => handleFilterChange('colors', color)}
            />
            {color}
          </label>
        ))}
      </div>
      <div>
        <h3>Gender</h3>
        {['Men', 'Women'].map((gender) => (
          <label key={gender}>
            <input
              type="checkbox"
              value={gender}
              checked={filters.gender.includes(gender)}
              onChange={() => handleFilterChange('gender', gender)}
            />
            {gender}
          </label>
        ))}
      </div>

      <div>
  <h3>Price Range</h3>
  {[
    { min: 0, max: 250 },
    { min: 251, max: 450 },
    { min: 451, max: Infinity }, // Use Infinity for '> 451'
  ].map((range) => (
    <label key={range.min}>
      <input
        type="checkbox"
        value={JSON.stringify(range)} // Convert object to string
        checked={filters.priceRange.some((selectedRange) =>
          JSON.stringify(selectedRange) === JSON.stringify(range)
        )}
        onChange={() => handleFilterChange('priceRange', range)}
      />
      {`${range.min} - ${range.max}`}
    </label>
  ))}
</div>



      <div>
        <h3>Type</h3>
        {['Polo', 'Hoodie', 'Basic'].map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              checked={filters.type.includes(type)}
              onChange={() => handleFilterChange('type', type)}
            />
            {type}
          </label>
        ))}
      </div>
      </div>
      <div className={`tshirt-card-container ${showFilters ? 'filters-open' : ''}`}>
        {filteredTshirts.map((tshirt) => (
          <div className={`tshirt-card ${showFilters ? 'filters-open' : ''}`} key={tshirt.id}>
            <img src={tshirt.imageURL} alt={tshirt.name} />
            <h3 className="item-name">{tshirt.name}</h3>
            <br />
            <br />
            <br />
            <div className="quantity-controls">
              <p className="price">₹{tshirt.price}</p>
              {cartItems[tshirt.id] === 0 || !cartItems[tshirt.id] ? (
                <button id="add-to-cart" onClick={() => handleAddToCart(tshirt.id)}>
                  Add to Cart
                </button>
              ) : (
                <span id="add-to-cart">
                  <button onClick={() => handleDecreaseQuantity(tshirt.id)}>-</button>
                  <span>{cartItems[tshirt.id]}</span>
                  <button onClick={() => handleAddToCart(tshirt.id)}>+</button>
                </span>
              )}
            </div>
            {errorMessages[tshirt.id] && (
              <div className="error-message">{errorMessages[tshirt.id]}</div> // Wrap the error message in a div
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TshirtCatalog;