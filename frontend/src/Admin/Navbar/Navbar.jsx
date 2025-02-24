import { FaBell, FaUser } from "react-icons/fa";
import './Navbar.css';
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
const Navbar = ({pagePath}) => {
  const {role}=useParams()
  return (
      <div className="navbar-container">
        <a href="#" className="navbar-brand">
          <span className="navbar-title">{pagePath}</span>
        </a>
        <div className="navbar-icons">
          <Link to={`/admin/Dashboard/${role}/Notifiication`}>
          <a href="tel:5541251234" className="navbar-icon">
            <FaBell size={30} color="#1A73E8" />
          </a>
          </Link>
         
          <a href="#" className="navbar-icon">
            <FaUser size={30} color="#1A73E8" />
          </a>
        </div>
      </div>
  );
};

export default Navbar;
Navbar.propTypes = {
  pagePath: PropTypes.string.isRequired,  // Expecting a boolean
};