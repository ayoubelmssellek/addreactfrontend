import { useEffect } from "react";
import { FaHome, FaSignOutAlt, FaChevronLeft, FaChevronRight,FaThList, FaTh } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import {  MdPeople } from "react-icons/md";


import './Sidebar.css';
import { readUsedSize } from "chart.js/helpers";
import { RxReload } from "react-icons/rx";

export default function Sidebar({ isOpen, onSidebarStateChange }) {
  const {role} = useParams()
  const toggleSidebar = () => {
    onSidebarStateChange(!isOpen);
  };

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth < 600) {
        onSidebarStateChange(false);
      } else {
        onSidebarStateChange(true);
      }
    };

    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar Content */}
      <div className="sidebar-header">
        <FaHome className="sidebar-icon" />
        <h2 className={`sidebar-title ${isOpen ? "visible" : "hidden"}`}>Gusto Dakhla</h2>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        <ul>
          <Link to={`/admin/Dashboard/${role}`}>
            <li>
              <a href="#" className={`menu-item ${isOpen ? "hoverable" : ""}`}>
                <FaTh className="menu-icon" />
                <span className={`menu-text ${isOpen ? "visible" : "hidden"}`}>Dashboard</span>
              </a>
            </li>
          </Link>
          <Link to={`/admin/Dashboard/${role}/AddProduct`}>
            <li>
              <a href="#" className={`menu-item ${isOpen ? "hoverable" : ""}`}>
                <TiPlus className="menu-icon" />
                <span className={`menu-text ${isOpen ? "visible" : "hidden"}`}>Add Product</span>
              </a>
            </li>
          </Link>
          <Link to={`/admin/Dashboard/${role}/Employees`}>
            <li>
              <span  className={`menu-item ${isOpen ? "hoverable" : ""}`}>
                <MdPeople className="menu-icon" />
                <span className={`menu-text ${isOpen ? "visible" : "hidden"}`}>Employees</span>
              </span>
            </li>
          </Link>
          <li>
            <a href="#" className={`menu-item ${isOpen ? "hoverable" : ""}`}>
              <FaThList className="menu-icon" />
              <span className={`menu-text ${isOpen ? "visible" : "hidden"}`}>Categories</span>
            </a>
          </li>
          {!isOpen && (
            <li>
              <button onClick={toggleSidebar} className="toggle-button">
                <FaChevronRight className="toggle-icon" />
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Logout (Fixed at Bottom) */}
      <div className="sidebar-footer" >
      <Link to={`/`}>

        <a href="#" className={`menu-item ${isOpen ? "hoverable" : ""}`}>
          <FaSignOutAlt className="menu-icon" />
            <span className={`menu-text ${isOpen ? "visible" : "hidden"}`}>Logout</span>
        
        </a>
        </Link>
      </div>

      {/* Toggle Button (Only visible when expanded) */}
      {isOpen && (
        <button onClick={toggleSidebar} className="close-button">
          <FaChevronLeft color='#fff' className="close-icon" />
        </button>
      )}
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSidebarStateChange: PropTypes.func.isRequired,
};
