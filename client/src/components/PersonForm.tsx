import React from 'react';
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
      </div>
      {/* <div className="form-group">
        <label htmlFor={`middleName-${index}`}>Middle Name</label>
        <input
          type="text"
          id={`middleName-${index}`}
          name="middleName"
          placeholder="Middle Name"
          value={person.middleName}
          onChange={(e) => onChange(index, e)}
        />
      </div> */}
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
      </div>

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

      {/* Unique ID Number Input */}
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

      {/* Email Input */}
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
      </div>

      {/* Phone Number Input */}
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
      </div>

      {/* ID Picture URL */}
      <div className="form-group">
        <label htmlFor={`idPicture-${index}`}>ID Picture (URL or Path)</label>
        <input
          type="text"
          id={`idPicture-${index}`}
          name="idPicture"
          placeholder="ID Picture URL or Path"
          value={person.idPicture}
          onChange={(e) => onChange(index, e)}
        />
      </div>

      {/* Remove Person Button */}
      {index > 0 && (
        <button
          type="button"
          onClick={() => removePerson(index)}
          className="remove-person-btn"
        >
          Remove Person
        </button>
      )}
    </div>
  );
};

export default PersonForm;