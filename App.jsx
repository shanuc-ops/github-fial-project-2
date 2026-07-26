import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1 className="company-name">Paradise Nursery</h1>
            <p className="tagline">Where Greenery Meets Serenity</p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
            <AboutUs />
          </div>
        </div>
      ) : (
        <div className="product-list-container">
          {/* Your product list / shop component goes here */}
        </div>
      )}
    </div>
  );
}

export default App;
