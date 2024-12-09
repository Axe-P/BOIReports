import { Link } from 'react-router-dom';
import './Navbar.css'; // You can create a separate CSS file for styling

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li>
          <Link to="/form" className="navbar-link">File Now</Link>
        </li>
        <li>
          <a href="https://fincen.gov/boi" target="_blank" rel="noopener noreferrer" className="navbar-link">
            FAQ
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
