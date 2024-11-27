import { useNavigate } from 'react-router-dom';
import './HomePage.css';  // Assuming you want to use a separate CSS file for styling

const HomePage = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleNavigateToForm = () => {
    navigate('/form'); // Navigates to the form page
  };

  return (
    <div className="home-page">
      <h1>Welcome to Pax Accounting!</h1>
      <p className="boir-description">
        The Beneficial Ownership Information Report (BOIR) is a new requirement under the Corporate Transparency Act for U.S. businesses.
      </p>
      <ul className="boir-info">
        <li>- Applies to most U.S. businesses</li>
        <li>- Deadline for filing is January 1st, 2025</li>
        <li>- Failure to file can result in penalties of up to $592 per day</li>
      </ul>
      <p className="cta-text">Click the button below to start filling out your report:</p>
      <button className="start-filing-btn" onClick={handleNavigateToForm}>
        Start Filing Now!
      </button>
    </div>
  );
};

export default HomePage;
