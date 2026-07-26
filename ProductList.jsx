import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedNodes, setAddedNodes] = useState({});
  const dispatch = useDispatch();

  // Retrieve cart items to calculate total count
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Plant categories and products data
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/07/18/18/24/lavender-2516670_1280.jpg", description: "Calming scent, used in aromatherapy.", cost: "$20" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/01/08/19/27/sweet-jasmine-3070080_1280.jpg", description: "Sweet fragrance, promotes relaxation.", cost: "$18" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-vera-3283112_1280.jpg", description: "Soothes skin burns and promotes healing.", cost: "$10" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/19/17/47/mint-1149881_1280.jpg", description: "Great for digestion and fresh drinks.", cost: "$8" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedNodes((prev) => ({ ...prev, [plant.name]: true }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      {/* Navigation Header */}
      <div className="navbar">
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
            <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Greenery Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#" onClick={(e) => handleContinueShopping(e)} style={{ color: 'white', fontSize: '20px', textDecoration: 'none', marginRight: '30px' }}>
            Plants
          </a>
          <a href="#" onClick={(e) => handleCartClick(e)} style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>
            <h1 className="cart">
              🛒 <span className="cart_quantity_count">{totalCartCount}</span>
            </h1>
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2 className="plant_heading">{categoryObj.category}</h2>
              <div className="product-list">
                {categoryObj.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <button
                      className={addedNodes[plant.name] || cartItems.some((item) => item.name === plant.name) ? "product-button disabled" : "product-button"}
                      disabled={addedNodes[plant.name] || cartItems.some((item) => item.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedNodes[plant.name] || cartItems.some((item) => item.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
