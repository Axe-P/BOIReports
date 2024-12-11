import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

// Types for the form data structure
interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Person {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  uniqueId: {
    type: string;
    number: string;
  };
  address: Address;
}

interface Submission {
  legalBusinessName: string;
  DBA: string;
  taxId: {
    type: string;
    number: string;
  };
  businessAddress: Address;
  peopleData: Person[];
}

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch submissions from the API
  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null); // Reset error before making the request

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://boireports.onrender.com/api/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmissions(response.data);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setError("Failed to fetch submissions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Render error message
  const renderError = () => {
    if (error) {
      return <div className="error-message">{error}</div>;
    }
  };

  // Render loading state
  const renderLoading = () => {
    if (loading) {
      return <div className="loading-message">Loading submissions...</div>;
    }
  };

  // Render person details within a submission
  const renderPersonDetails = (person: Person) => (
    <div key={person.uniqueId.number} className="person-details">
      <h5>
        {person.firstName} {person.middleName} {person.lastName}
      </h5>
      <p>
        <strong>Email:</strong> {person.email}
      </p>
      <p>
        <strong>Phone:</strong> {person.phoneNumber}
      </p>
      <p>
        <strong>ID Type:</strong> {person.uniqueId.type}
      </p>
      <p>
        <strong>ID Number:</strong> {person.uniqueId.number}
      </p>
      <p>
        <strong>Date of Birth:</strong> {person.dateOfBirth.substring(0, 10)}
      </p>
      <p>
        <strong>Address:</strong> {`${person.address.street}, ${person.address.city}, ${person.address.state}, ${person.address.zipCode}`}
      </p>
    </div>
  );

  // Render a submission card
  const renderSubmissionCard = (submission: Submission) => (
    <div key={`${submission.legalBusinessName}-${submission.DBA}`} className="submission-card">
      <h2>{submission.legalBusinessName}</h2>
      {submission.DBA && <h3>DBA: {submission.DBA}</h3>}
      <div>
        <h4>Tax ID:</h4>
        <p>
          <strong>Type:</strong> {submission.taxId.type}
        </p>
        <p>
          <strong>Number:</strong> {submission.taxId.number}
        </p>

        <h4>Business Address:</h4>
        <p>
          {submission.businessAddress.street}, {submission.businessAddress.city}, {submission.businessAddress.state}, {submission.businessAddress.zipCode}
        </p>
      </div>

      <div>
        <h4>People:</h4>
        {submission.peopleData.map(renderPersonDetails)}
      </div>
    </div>
  );

  // Render submissions if available
  const renderSubmissions = () => {
    if (submissions.length === 0) {
      return <p>No submissions found.</p>;
    }

    return submissions.map(renderSubmissionCard);
  };

  return (
    <div className="admin-dashboard">
      {renderError()}
      {renderLoading()}
      <div className="submissions-container">
        {renderSubmissions()}
      </div>
    </div>
  );
};

export default AdminDashboard;