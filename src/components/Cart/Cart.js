import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/actions'; // Import your Redux actions
import CartCss from './Cart.css';
import catalogData from '../catalog.json'; // Import your catalog data

const Cart = () => {
  const dispatch = useDispatch();
  const itemQuantities = useSelector((state) => state.cart);
  const tshirts = useSelector((state) => state.tshirts);
  const [errorMessages, setErrorMessages] = useState({});

  const selectedItems = tshirts.filter((tshirt) => itemQuantities[tshirt.id] > 0);

  const totalCartPrice = selectedItems.reduce((total, tshirt) => {
    return total + (itemQuantities[tshirt.id] || 0) * tshirt.price;
  }, 0);

  const handleIncreaseQuantity = (itemId) => {
    const catalogItem = catalogData.find((item) => item.id === itemId); // Find the item in the catalog
    if (!catalogItem) {
      console.error("Item not found in the catalog.");
      return;
    }
  
    const availableQuantity = catalogItem.quantity;
    const currentQuantity = itemQuantities[itemId] || 0;
  
    if (currentQuantity < availableQuantity) {
      dispatch(increaseQuantity(itemId)); // Dispatch action to increase quantity
      setErrorMessages({
        ...errorMessages,
        [itemId]: '',
      });
    } else {
      setErrorMessages({
        ...errorMessages,
        [itemId]: 'Quantity exceeds available stock.',
      });
    }
  };
  
  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId)); 
    setErrorMessages({
      ...errorMessages,
      [itemId]: '',
    });
  };
  
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId)); // Dispatch action to remove item from the cart
  };

  const totalItemQuantity = selectedItems.reduce((total, tshirt) => {
    return total + (itemQuantities[tshirt.id] || 0);
  }, 0);

  return (
    <div>
      <div className="placeholder"></div>
      {selectedItems.length !== 0 ? (
      <div className="total-cart-price">
      <p>Number of Items: {selectedItems.length}</p>
      <p>Item Quantity: {totalItemQuantity}</p>
      <p>Amount: ₹{totalCartPrice}</p>
      </div>) : (<></>) }
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

      <div >
    {selectedItems.length === 0 ? (
      <div className="empty-cart-container">
        <p className="empty-cart-message">Cart is empty. Shop now!</p>
        <br/>
        <Link to="/" className="empty-cart-link">Go to Store</Link>
      </div>
    ) : (
      <div className="cart-grid">
        {selectedItems.map((tshirt) => (
          <span className="cart-card" key={tshirt.id}>
            <img src={tshirt.imageURL} alt={tshirt.name} className="cart-image" />

            <span className="cart-details">
              <h3 className="item-name">{tshirt.name}</h3>
              <p className="item-price">₹{tshirt.price}</p>
            </span>

            <span className="quantitySplit">
              <span className="quantity-controls">
                <button onClick={() => handleDecreaseQuantity(tshirt.id)}>-</button>
                <p className="quantity">{itemQuantities[tshirt.id] || 0}</p>
                <button onClick={() => handleIncreaseQuantity(tshirt.id)}>+</button>
                <button onClick={() => handleRemoveItem(tshirt.id)}>Remove</button>
                {errorMessages[tshirt.id] && (
                  <span className="error">{errorMessages[tshirt.id]}</span> // Wrap the error message in a div
                )}
              </span>
              <p className="total-price">
                Total: ₹{itemQuantities[tshirt.id] * tshirt.price || 0}
                <br/>
        
              </p>
            </span>

          </span>
        ))}
      </div>
      )}
      </div>
    </div>
  );
};

export default Cart;
