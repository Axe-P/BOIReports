import React, { useEffect, useState } from "react";
import axios from "axios";

interface Submission {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  uniqueId: string;
  idPicture: string;
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
  const handleDelete = async (uniqueId: string) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Attempting to delete uniqueId:", uniqueId); // Debugging
      const response = await axios.delete(
        `https://boireports.onrender.com/api/admin/delete/${uniqueId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Delete response:", response.data); // Debugging
      // Remove the deleted submission from state
      setSubmissions((prev) =>
        prev.filter((submission) => submission.uniqueId !== uniqueId)
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
            <div key={submission.uniqueId} className="submission-card">
              <h2>{`${submission.firstName} ${submission.lastName}`}</h2>
              <p>
                <strong>Email:</strong> {submission.email}
              </p>
              <p>
                <strong>Details:</strong> ID Number: {submission.uniqueId}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${submission.address.street}, ${submission.address.city}, ${submission.address.state}, ${submission.address.zipCode}`}
              </p>
              <button onClick={() => handleDelete(submission.uniqueId)}>
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