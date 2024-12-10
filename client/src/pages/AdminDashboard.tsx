import React, { useEffect, useState } from "react";
import axios from "axios";

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
  uniqueId: string;
  idPicture: string;
  address: Address;
}

interface Submission {
  legalBusinessName: string;
  DBA: string;
  peopleData: Person[]; // people data will be an array of Person objects
}

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState("");

  // Fetch all submissions
  const fetchSubmissions = async () => {
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
      setError("Failed to fetch data. Please log in again.");
      console.error(err); // Debugging
    }
  };

  // Handle deletion of a submission
  const handleDelete = async (legalBusinessName: string, DBA: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://boireports.onrender.com/api/admin/delete/${legalBusinessName}/${DBA}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Remove the deleted submission from state
      setSubmissions((prev) =>
        prev.filter(
          (submission) =>
            submission.legalBusinessName !== legalBusinessName &&
            submission.DBA !== DBA
        )
      );
      alert("Submission deleted successfully.");
    } catch (err: unknown) {
      alert("Failed to delete the submission.");
      if (axios.isAxiosError(err)) {
        console.error("Error deleting submission:", err.response || err); // Debugging
      } else {
        console.error("Error deleting submission:", err); // Debugging
      }
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {submissions.length > 0 ? (
        <div className="submissions-container">
          {submissions.map((submission) => (
            <div key={`${submission.legalBusinessName}-${submission.DBA}`} className="submission-card">
              <h2>{submission.legalBusinessName}</h2>
              {submission.DBA && <h3>DBA: {submission.DBA}</h3>}
              <div>
                <h4>People:</h4>
                {submission.peopleData.map((person, index) => (
                  <div key={person.uniqueId} className="person-details">
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
                      <strong>ID Number:</strong> {person.uniqueId}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> {person.dateOfBirth}
                    </p>
                    <p>
                      <strong>Address:</strong> {`${person.address.street}, ${person.address.city}, ${person.address.state}, ${person.address.zipCode}`}
                    </p>
                    {/* You can also render the ID picture if needed */}
                    {person.idPicture && (
                      <img
                        src={person.idPicture}
                        alt="ID Picture"
                        style={{ width: "100px", height: "auto" }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleDelete(submission.legalBusinessName, submission.DBA)}
              >
                Delete
              </button>
              <button>Edit</button> {/* Add edit functionality as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>No submissions found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;