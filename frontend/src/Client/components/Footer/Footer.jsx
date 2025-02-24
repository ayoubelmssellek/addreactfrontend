import './Footer.css'
import { FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
const Footer = () => {
  return (
  <footer>
  <div className="social-icons">
    {/* <i  aria-hidden="true"><FaInstagram size={40}  /></i>
    <i  aria-hidden="true"> <BsWhatsapp size={40} /></i> */}
  </div>


  <div className="links">
    <a href="#">About Us</a>
    <a href="#">Contact Us</a>
  </div>

  <hr />

  <div className="copyright">
    &copy; 2025 Gusto Dakhla. All Rights Reserved.
  </div>
</footer>

  )
}

export default Footer
