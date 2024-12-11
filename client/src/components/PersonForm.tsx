import React, { useState } from 'react';
import AddressForm from './AddressForm';
import { Person } from '../types/formTypes';

interface PersonFormProps {
  person: Person;
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: { [key: string]: string };
  index: number;
  removePerson: (index: number) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({ person, onChange, index, removePerson }) => {
  // Error state to store individual field errors
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Validation function for each field
  const validate = () => {
    const errors: { [key: string]: string } = {};

    // Name Fields Validation
    if (!person.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    if (!person.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }

    // Date of Birth Validation
    if (!person.dateOfBirth.trim()) {
      errors.dateOfBirth = 'Date of Birth is required';
    }

    // Email Validation (Basic email pattern check)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!person.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(person.email)) {
      errors.email = 'Invalid email format';
    }

    // Phone Number Validation (basic check for numbers)
    const phonePattern = /^[0-9]{10}$/;
    if (!person.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!phonePattern.test(person.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits';
    }

    // Update form errors state
    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    const errors = validate();

    // Only submit if there are no errors
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted');
      // Call your submit handler or state change here
    }
  };

  return (
    <div className="person-form">
      <h4>Person {index + 1}</h4>

      {/* Name Fields */}
      <div className="form-group">
        <label htmlFor={`firstName-${index}`}>First Name</label>
        <input
          type="text"
          id={`firstName-${index}`}
          name="firstName"
          placeholder="First Name"
          value={person.firstName}
          onChange={(e) => onChange(index, e)}
          required
        />
        {formErrors.firstName && <div className="error">{formErrors.firstName}</div>}
      </div>

      {/* Last Name Field */}
      <div className="form-group">
        <label htmlFor={`lastName-${index}`}>Last Name</label>
        <input
          type="text"
          id={`lastName-${index}`}
          name="lastName"
          placeholder="Last Name"
          value={person.lastName}
          onChange={(e) => onChange(index, e)}
          required
        />
        {formErrors.lastName && <div className="error">{formErrors.lastName}</div>}
      </div>

      {/* Date of Birth */}
      <div className="form-group">
        <label htmlFor={`dateOfBirth-${index}`}>Date of Birth</label>
        <input
          type="date"
          id={`dateOfBirth-${index}`}
          name="dateOfBirth"
          value={person.dateOfBirth}
          onChange={(e) => onChange(index, e)}
          required
        />
        {formErrors.dateOfBirth && <div className="error">{formErrors.dateOfBirth}</div>}
      </div>

      {/* Address Form for this person */}
      <AddressForm address={person.address} onChange={onChange} index={index} />

      {/* Unique ID Type Dropdown */}
      <div className="form-group">
        <label htmlFor={`uniqueIdType-${index}`}>Unique ID Type</label>
        <select
          id={`uniqueIdType-${index}`}
          name="uniqueIdType"
          value={person.uniqueIdType}
          onChange={(e) => onChange(index, e)}
          required
        >
          <option value="">Select ID Type</option>
          <option value="State-issued driver's license">State-issued driver's license</option>
          <option value="State/local/tribe-issued ID">State/local/tribe-issued ID</option>
          <option value="U.S. passport">U.S. passport</option>
          <option value="Foreign passport">Foreign passport</option>
        </select>
      </div>

      {/* Unique ID Number */}
      <div className="form-group">
        <label htmlFor={`uniqueIdNumber-${index}`}>Unique ID Number</label>
        <input
          type="text"
          id={`uniqueIdNumber-${index}`}
          name="uniqueIdNumber"
          placeholder="Enter ID Number"
          value={person.uniqueIdNumber}
          onChange={(e) => onChange(index, e)}
          required
        />
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor={`email-${index}`}>Email</label>
        <input
          type="email"
          id={`email-${index}`}
          name="email"
          placeholder="Email"
          value={person.email}
          onChange={(e) => onChange(index, e)}
          required
        />
        {formErrors.email && <div className="error">{formErrors.email}</div>}
      </div>

      {/* Phone Number */}
      <div className="form-group">
        <label htmlFor={`phoneNumber-${index}`}>Phone Number</label>
        <input
          type="text"
          id={`phoneNumber-${index}`}
          name="phoneNumber"
          placeholder="Phone Number"
          value={person.phoneNumber}
          onChange={(e) => onChange(index, e)}
          required
        />
        {formErrors.phoneNumber && <div className="error">{formErrors.phoneNumber}</div>}
      </div>

      {/* Remove Person Button */}
      {index > 0 && (
        <button
          type="button"
          onClick={() => removePerson(index)}
          className="remove-person-btn"
        >
          Remove beneficial owner
        </button>
      )}

      {/* Submit Button */}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default PersonForm;