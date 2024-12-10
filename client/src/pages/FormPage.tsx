import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormData, Person } from '../types/formTypes'; // Adjust the import based on your types file
import PersonForm from '../components/PersonForm'; // Adjust the import path as needed
import './FormPage.css';

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    legalBusinessName: '',
    DBA: '',
    taxIdType: '',  // Added business-level taxIdType
    taxIdNumber: '',  // Added business-level taxIdNumber
    people: [{
      firstName: '', middleName: '', lastName: '', dateOfBirth: '',
      address: { street: '', city: '', state: '', zipCode: '' },
      uniqueIdType: '', uniqueIdNumber: '', email: '', phoneNumber: '', idPicture: '',
      errors: {} // Add an "errors" object for each person to hold specific errors
    }],
  });

  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  // Function to handle input changes for people
  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedPeople = [...formData.people];
    
    // Handle address change
    if (name in updatedPeople[index].address) {
      updatedPeople[index].address[name as keyof Person['address']] = value;
    } else {
      // Handle the new fields (uniqueId, taxId, etc.)
      updatedPeople[index][name as keyof Omit<Person, 'address' | 'errors'>] = value;
    }
    setFormData({ ...formData, people: updatedPeople });
  };

  // Function to add a new person (up to 4 people)
  const addPerson = () => {
    if (formData.people.length < 4) {
      setFormData({
        ...formData,
        people: [...formData.people, {
          firstName: '', middleName: '', lastName: '', dateOfBirth: '',
          address: { street: '', city: '', state: '', zipCode: '' },
          uniqueIdType: '', uniqueIdNumber: '', email: '', phoneNumber: '', idPicture: '',
          errors: {} // Initialize error object for new person
        }]
      });
      console.log("Added new person:", formData.people);
    } else {
      console.log("Max number of people (4) reached.");
    }
  };

  // Function to remove a person (but not the first person)
  const removePerson = (index: number) => {
    if (index === 0) return; // Don't allow removal of the first person
    const updatedPeople = formData.people.filter((_, i) => i !== index);
    setFormData({ ...formData, people: updatedPeople });
    console.log(`Removed person at index ${index}:`, updatedPeople);
  };

  // Validation functions (including new ones)
  const validateName = (name: string) => /^[A-Za-z\s]{2,20}$/.test(name);
  const validateZipCode = (zip: string) => /^\d{5}$/.test(zip);
  const validateIdNumber = (id: string) => /^\d+$/.test(id);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phone: string) => /^\d{10}$/.test(phone);
  const validateTaxId = (taxId: string) => /^\d{9}$/.test(taxId); // Assuming EIN/SSN/TIN is a 9-digit number

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission started...");

    const newErrors: string[] = [];
    const updatedPeople = [...formData.people];

    // Validate each person in the form
    updatedPeople.forEach((person, index) => {
      const personErrors: { [key: string]: string } = {}; // Error object for this person

      if (!validateName(person.firstName)) {
        personErrors.firstName = `Person ${index + 1}: First Name must be between 2 and 20 characters long and contain only letters.`;
      }
      if (person.middleName && !validateName(person.middleName)) {
        personErrors.middleName = `Person ${index + 1}: Middle Name must be between 2 and 20 characters long and contain only letters.`;
      }
      if (!validateName(person.lastName)) {
        personErrors.lastName = `Person ${index + 1}: Last Name must be between 2 and 20 characters long and contain only letters.`;
      }
      if (!validateZipCode(person.address.zipCode)) {
        personErrors.zipCode = `Person ${index + 1}: Zip Code must be exactly 5 digits.`;
      }
      if (!validateIdNumber(person.uniqueIdNumber)) {
        personErrors.uniqueIdNumber = `Person ${index + 1}: ID Number must contain only numbers.`;
      }
      if (!person.uniqueIdType) {
        personErrors.uniqueIdType = `Person ${index + 1}: Please select a valid ID Type.`;
      }
      if (!validateEmail(person.email)) {
        personErrors.email = `Person ${index + 1}: Please enter a valid email address.`;
      }
      if (!validatePhoneNumber(person.phoneNumber)) {
        personErrors.phoneNumber = `Person ${index + 1}: Phone Number must be exactly 10 digits.`;
      }

      // If errors are found for this person, add them to the person's errors
      if (Object.keys(personErrors).length > 0) {
        updatedPeople[index].errors = personErrors; // Store errors for each person
        newErrors.push(...Object.values(personErrors)); // Add all person errors to global error list
      }
    });

    // Validate business-level taxIdType and taxIdNumber
    if (!formData.taxIdType) {
      newErrors.push("Business tax ID Type is required.");
    }
    if (!formData.taxIdNumber || !validateTaxId(formData.taxIdNumber)) {
      newErrors.push("Business tax ID Number is required and must be a valid 9-digit number.");
    }

    if (newErrors.length > 0) {
      console.log("Validation errors found:", newErrors);
      setErrors(newErrors); // Set global errors
      setFormData({ ...formData, people: updatedPeople }); // Update the form data with person-specific errors
      return;  // If there are errors, don't submit the form
    }

    // Prepare data for submission (adjust to match backend format)
    const dataToSend = {
      legalBusinessName: formData.legalBusinessName,
      DBA: formData.DBA,
      taxId: {
        type: formData.taxIdType,
        number: formData.taxIdNumber,
      },
      peopleData: formData.people.map(person => {
        const { uniqueIdType, uniqueIdNumber, ...personWithoutErrors } = person; // Exclude errors and other unnecessary fields

        // Nest uniqueId data properly
        return {
          ...personWithoutErrors,
          uniqueId: {
            type: uniqueIdType,
            number: uniqueIdNumber,
          },
        };
      }),
    };

    console.log("Data being sent to backend:", dataToSend); // Log the data to be sent

    try {
      await axios.post('https://boireports.onrender.com/api/reports/submit', dataToSend, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Report submitted');
      navigate('/completion');
    } catch (error) {
      console.error('Error submitting report:', error);
      console.log("Failed data:", dataToSend); // Log the data again in case of an error
    }
  };

  return (
    <div className="form-container" style={{ paddingTop: formData.people.length > 1 ? `${1100 * (formData.people.length - 1)}px` : '0' }}>

      {/* Display global errors at the top */}
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
          <h2>Any person with 25% or more ownership of the company, or who plays a significant role. Must be listed as a beneficial owner and information must be provided below</h2>
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
            id="DBA"
            name="DBA"
            placeholder="DBA (Optional)"
            value={formData.DBA}
            onChange={(e) => setFormData({ ...formData, DBA: e.target.value })}
          />
        </div>

        {/* New fields for business tax ID */}
        <div className="form-group">
          <label htmlFor="taxIdType">Business Tax ID Type</label>
          <select
            id="taxIdType"
            name="taxIdType"
            value={formData.taxIdType}
            onChange={(e) => setFormData({ ...formData, taxIdType: e.target.value })}
            required
          >
            <option value="">Select Tax ID Type</option>
            <option value="EIN">EIN</option>
            <option value="SSN/TIN">SSN/TIN</option>
            <option value="Foreign">Foreign</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="taxIdNumber">Business Tax ID Number</label>
          <input
            type="text"
            id="taxIdNumber"
            name="taxIdNumber"
            value={formData.taxIdNumber}
            onChange={(e) => setFormData({ ...formData, taxIdNumber: e.target.value })}
            placeholder="Enter business tax ID"
            required
          />
        </div>

        {formData.people.map((person, index) => (
          <PersonForm
            key={index}
            person={person}
            onChange={handleInputChange}
            index={index}
            removePerson={removePerson}
            errors={person.errors}  // Pass errors for this person
          />
        ))}

        {/* Add Person button is disabled if there are 4 people */}
        {formData.people.length < 4 && (
          <button
            type="button"
            onClick={addPerson}
            className="add-person-btn"
          >
            Add Person
          </button>
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;