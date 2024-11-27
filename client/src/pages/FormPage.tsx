import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';

const FormPage = () => {
  interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }

  interface FormData {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    address: Address;
    idNumber: string;
    idPhoto: string;
  }

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    idNumber: '',
    idPhoto: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validation functions
  const validateName = (name: string) => /^[A-Za-z\s]{2,20}$/.test(name);
  const validateZipCode = (zip: string) => /^\d{5}$/.test(zip);
  const validateIdNumber = (id: string) => /^\d+$/.test(id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];

    // Validate First Name
    if (!validateName(formData.firstName)) {
      newErrors.push('First Name must be between 2 and 20 characters long and contain only letters.');
    }

    // Validate Middle Name (if provided)
    if (formData.middleName && !validateName(formData.middleName)) {
      newErrors.push('Middle Name must be between 2 and 20 characters long and contain only letters.');
    }

    // Validate Last Name
    if (!validateName(formData.lastName)) {
      newErrors.push('Last Name must be between 2 and 20 characters long and contain only letters.');
    }

    // Validate Zip Code
    if (!validateZipCode(formData.address.zipCode)) {
      newErrors.push('Zip Code must be exactly 5 digits.');
    }

    // Validate ID Number
    if (!validateIdNumber(formData.idNumber)) {
      newErrors.push('ID Number must contain only numbers.');
    }

    // If there are errors, display them and don't submit the form
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataToSend = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      uniqueId: formData.idNumber,
      idPicture: formData.idPhoto,
      income: 5000,
    };

    try {
      await axios.post('http://localhost:3001/api/reports/submit', dataToSend, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Report submitted');
      navigate('/completion');
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Please fill out information for any owner with 25% or more ownership</h2>
      <h3>All fields must be completed!</h3>
      <p>Upfront pricing: $125 to file your BOI Report</p>
      <p>You may also talk to a real accountant <a href="tel:801-921-0883">(here)</a></p>

      {errors.length > 0 && (
        <div className="error-messages">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="middleName">Middle Name</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="street">Street Address</label>
          <input
            type="text"
            id="street"
            name="street"
            placeholder="Street Address"
            value={formData.address.street}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={formData.address.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="State"
            value={formData.address.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.address.zipCode}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="idNumber">ID Number</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="idPhoto">ID Photo URL</label>
          <input
            type="text"
            id="idPhoto"
            name="idPhoto"
            placeholder="ID Photo URL"
            value={formData.idPhoto}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;