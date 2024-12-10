import { useNavigate } from 'react-router-dom';
import './HomePage.css';  // Assuming you want to use a separate CSS file for styling

const HomePage = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleNavigateToForm = () => {
    navigate('/form'); // Navigates to the form page
  };

  return (
    <div className="home-page">
      <h3>File your BOI Report with peace of mind</h3>
      <h1>Pax Accounting</h1>
      <h3>We will file your form within 48 hours of submission</h3>
      <p>Pricing: $125</p>
      <button className="start-filing-btn" onClick={handleNavigateToForm}>
        Click here to file now!
      </button>
    </div>
  );
};

export default HomePage;