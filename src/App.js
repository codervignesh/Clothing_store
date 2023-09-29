import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TshirtCatalog from './components/TshirtCatalog/TshirtCatalog.js';
import Cart from './components/Cart/Cart.js'; // Import the Cart component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<TshirtCatalog />} />
            <Route path="/cart" element={<Cart />} /> {/* Use element prop to render components */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
