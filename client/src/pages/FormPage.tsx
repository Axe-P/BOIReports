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

  interface Person {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    address: Address;
    idNumber: string;
    email: string;
  }

  interface FormData {
    legalBusinessName: string;
    dba: string;
    people: Person[]; // Array of people
  }

  const [formData, setFormData] = useState<FormData>({
    legalBusinessName: '',
    dba: '',
    people: [{ firstName: '', middleName: '', lastName: '', dateOfBirth: '', address: { street: '', city: '', state: '', zipCode: '' }, idNumber: '', email: '' }],
  });

  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  // Function to handle input changes for people
  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedPeople = [...formData.people];
    if (name in updatedPeople[index].address) {
      updatedPeople[index].address[name as keyof Address] = value;
    } else {
      updatedPeople[index][name as keyof Omit<Person, 'address'>] = value;
    }
    setFormData({ ...formData, people: updatedPeople });
  };

  // Function to add a new person (up to 4 people)
  const addPerson = () => {
    if (formData.people.length < 4) {
      setFormData({
        ...formData,
        people: [...formData.people, { firstName: '', middleName: '', lastName: '', dateOfBirth: '', address: { street: '', city: '', state: '', zipCode: '' }, idNumber: '', email: '' }],
      });
    }
  };

  // Function to remove a person, but not the first person
  const removePerson = (index: number) => {
    if (index === 0) return; // Don't allow removal of the first person
    const updatedPeople = formData.people.filter((_, i) => i !== index);
    setFormData({ ...formData, people: updatedPeople });
  };

  // Validation functions (same as before)
  const validateName = (name: string) => /^[A-Za-z\s]{2,20}$/.test(name);
  const validateZipCode = (zip: string) => /^\d{5}$/.test(zip);
  const validateIdNumber = (id: string) => /^\d+$/.test(id);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];

    // Validate each person in the form
    formData.people.forEach((person, index) => {
      if (!validateName(person.firstName)) {
        newErrors.push(`First Name of person ${index + 1} must be between 2 and 20 characters long and contain only letters.`);
      }
      if (person.middleName && !validateName(person.middleName)) {
        newErrors.push(`Middle Name of person ${index + 1} must be between 2 and 20 characters long and contain only letters.`);
      }
      if (!validateName(person.lastName)) {
        newErrors.push(`Last Name of person ${index + 1} must be between 2 and 20 characters long and contain only letters.`);
      }
      if (!validateZipCode(person.address.zipCode)) {
        newErrors.push(`Zip Code of person ${index + 1} must be exactly 5 digits.`);
      }
      if (!validateIdNumber(person.idNumber)) {
        newErrors.push(`ID Number of person ${index + 1} must contain only numbers.`);
      }
      if (!validateEmail(person.email)) {
        newErrors.push(`Please enter a valid email address for person ${index + 1}.`);
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare data for submission
    const dataToSend = {
      legalBusinessName: formData.legalBusinessName,
      dba: formData.dba,
      people: formData.people,
    };

    try {
      await axios.post('https://boireports.onrender.com/api/reports/submit', dataToSend, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Report submitted');
      navigate('/completion');
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className="form-container" style={{ paddingTop: formData.people.length > 1 ? `${925 * (formData.people.length - 1)}px` : '0' }}>
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
        <div className="form-top">
          <h2>Please fill out information for any owner with 25% or more ownership</h2>
          <h3>All fields must be completed!</h3>
          <p>Upfront pricing: $125 to file your BOI Report</p>
        </div>
        <div className="form-group">
          <label htmlFor="legalBusinessName">Legal Business Name</label>
          <input
            type="text"
            id="legalBusinessName"
            name="legalBusinessName"
            placeholder="Legal Business Name"
            value={formData.legalBusinessName}
            onChange={(e) => setFormData({ ...formData, legalBusinessName: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dba">DBA (Doing Business As)</label>
          <input
            type="text"
            id="dba"
            name="dba"
            placeholder="DBA (Optional)"
            value={formData.dba}
            onChange={(e) => setFormData({ ...formData, dba: e.target.value })}
          />
        </div>

        {formData.people.map((person, index) => (
          <div key={index} className="person-form">
            <h4>Person {index + 1}</h4>
            <div className="form-group">
              <label htmlFor={`firstName-${index}`}>First Name</label>
              <input
                type="text"
                id={`firstName-${index}`}
                name="firstName"
                placeholder="First Name"
                value={person.firstName}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`middleName-${index}`}>Middle Name</label>
              <input
                type="text"
                id={`middleName-${index}`}
                name="middleName"
                placeholder="Middle Name"
                value={person.middleName}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`lastName-${index}`}>Last Name</label>
              <input
                type="text"
                id={`lastName-${index}`}
                name="lastName"
                placeholder="Last Name"
                value={person.lastName}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`dateOfBirth-${index}`}>Date of Birth</label>
              <input
                type="date"
                id={`dateOfBirth-${index}`}
                name="dateOfBirth"
                value={person.dateOfBirth}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`street-${index}`}>Street Address</label>
              <input
                type="text"
                id={`street-${index}`}
                name="street"
                placeholder="Street Address"
                value={person.address.street}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`city-${index}`}>City</label>
              <input
                type="text"
                id={`city-${index}`}
                name="city"
                placeholder="City"
                value={person.address.city}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`state-${index}`}>State</label>
              <input
                type="text"
                id={`state-${index}`}
                name="state"
                placeholder="State"
                value={person.address.state}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`zipCode-${index}`}>Zip Code</label>
              <input
                type="text"
                id={`zipCode-${index}`}
                name="zipCode"
                placeholder="Zip Code"
                value={person.address.zipCode}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`idNumber-${index}`}>ID Number</label>
              <input
                type="text"
                id={`idNumber-${index}`}
                name="idNumber"
                placeholder="ID Number"
                value={person.idNumber}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`email-${index}`}>Email</label>
              <input
                type="email"
                id={`email-${index}`}
                name="email"
                placeholder="Email"
                value={person.email}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            {index > 0 && (
              <button type="button" onClick={() => removePerson(index)}>
                Remove Person
              </button>
            )}
          </div>
        ))}

<div className="form-actions">
  {formData.people.length < 4 && (
    <button type="button" onClick={addPerson}>
      Add Person
    </button>
  )}
  <button type="submit">Submit</button>
</div>

      </form>
    </div>
  );
};

export default FormPage;