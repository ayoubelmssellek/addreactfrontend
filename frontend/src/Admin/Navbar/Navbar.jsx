import { FaBell, FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


const Navbar = ({ pagePath }) => {
  const { role } = useParams();
  const Notification = useSelector((state) => state.admin.Notifications);
  const NewOrders = Notification.filter((item) => item.type === 'order' && !item.isRead);
  const NewReview = Notification.filter((item) => item.type === 'reviews' && !item.isRead);

  // State for dark mode
  const [isDarkMode, setIsDarkMode] =useState(localStorage.getItem('theme')=='dark'?true:false)

  // Reset notification count
  const resetNotificationCount = () => {
        // change IsRead to true here 
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Apply theme to the HTML element and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Check for saved user preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <div className="navbar-container">
      <a href="#" className="navbar-brand">
        <span className="navbar-title">{pagePath}</span>
      </a>
      <div className="navbar-icons">
        <Link to={`/admin/Dashboard/${role}/Notification`}>
          <span className="navbar-icon">
            <FaBell  onClick={resetNotificationCount} size={30} />
            {NewReview.length+NewOrders.length > 0 && (
              <span className="navbar-ntf" style={{ color: 'red' }}>
                {NewOrders.length+NewReview.length}
              </span>
            )}
          </span>
        </Link>

        <button onClick={toggleTheme} className="theme-toggle-button">
          {isDarkMode ? <FaMoon size={30} /> : <FaSun size={30} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;

Navbar.propTypes = {
  pagePath: PropTypes.string.isRequired,
};