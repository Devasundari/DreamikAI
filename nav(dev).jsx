import React, { useContext, useState, useRef, useEffect } from 'react';
import ResellerLogin from './ResellerLogin';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';
import cartLogo from '../assets/cartlogo1.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Nav.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useContext(CartContext);
  const [showResellerLogin, setShowResellerLogin] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false); // Track search input visibility
  const [searchText, setSearchText] = useState(""); // Track search input text
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCartClick = () => {
    navigate('/Order'); // Navigate to the order/cart page
  };

  const toggleProductsDropdown = () => {
    setShowProductsDropdown((prev) => !prev);
  };

  const handleProductClick = (route) => {
    navigate(route);
    setShowProductsDropdown(false); // Close the dropdown after clicking an item
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProductsDropdown(false); // Close dropdown
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('click', handleOutsideClick);

    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const isProductsPage = location.pathname === '/'; // Check if the current page is "Products"

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive); // Toggle search input
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value); // Update search text
  };

  return (
    <nav id="header">
      <a href="#" className="logo-section">
        <img src={logo} alt="logo" className="logo" />
        <h2>DreamikAI</h2>
      </a>

      <div id="menu" onClick={toggleMenu}>
        <img src={menuIcon} alt="menu" id="menubar" />
      </div>

      <div id={menuOpen ? 'nav-active' : 'nav'}>
        <ul id="navbar">
          <li>
            <a href="#" onClick={() => navigate('/')} className="active">
              Go To Shop
            </a>
          </li>

          {/* Show Reseller Login in Products Page */}
          {isProductsPage && (
            <li>
              <h3
                className="active"
                id="reseller"
                onClick={() => setShowResellerLogin(true)}
              >
                Reseller Login
              </h3>
              {showResellerLogin && (
                <ResellerLogin onClose={() => setShowResellerLogin(false)} />
              )}
            </li>
          )}

          <li className="active" onClick={() => navigate('/BulkOrder')}>
            <h3 id="bulk-order" style={{ cursor: 'pointer' }}>Bulk-Order</h3>
          </li>

          {/* Conditionally render "Other Products" */}
         {!isProductsPage && (
  <li
    className={`dropdown ${showProductsDropdown ? 'dropdown-active' : ''}`}
    ref={dropdownRef}
  >
    <h4
      className="dropdown-header"
      id="products"
      onClick={toggleProductsDropdown}
    >
      Other Products
    </h4>
    {showProductsDropdown && (
      <ul className="dropdown-menu">
        <li onClick={() => handleProductClick('/NameSlips')} className="dropdown-item">
          Name Slip
        </li>
        <li onClick={() => handleProductClick('/BagTag')} className="dropdown-item">
          Bag Tag
        </li>
        <li onClick={() => handleProductClick('/Poster')} className="dropdown-item">
          Poster
        </li>
        <li onClick={() => handleProductClick('/Sticker')} className="dropdown-item">
          Sticker
        </li>
        <li onClick={() => setShowResellerLogin(true)} className="dropdown-item">
          Reseller Login
        </li>
      </ul>
    )}
  </li>
)}


          {/* Search Icon */}
          <li>
            <a href="#" onClick={toggleSearch} className="search-icon-link">
              {isSearchActive ? (
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  id="search"
                />
              ) : (
                <i className="fa-solid fa-magnifying-glass"></i>
              )}
            </a>
          </li>

          {/* Cart Icon */}
          <li>
            <a href="#" onClick={handleCartClick} className="cart-icon-link">
              <i className="fa-solid fa-cart-shopping"></i>
              <h3 id="cartnm">{cartCount}</h3>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
