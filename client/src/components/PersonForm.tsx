// src/components/PersonForm.tsx

import React from 'react';
import AddressForm from './AddressForm';
import { Person } from '../types/formTypes';

interface PersonFormProps {
  person: Person;
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string }; // Add errors property
  index: number;
  removePerson: (index: number) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({ person, onChange, index, removePerson }) => {
  return (
    <div className="person-form">
      <h4>Person {index + 1}</h4>
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
      <div className="form-group">
        <label htmlFor={`middleName-${index}`}>Middle Name</label>
        <input
          type="text"
          id={`middleName-${index}`}
          name="middleName"
          placeholder="Middle Name"
          value={person.middleName}
          onChange={(e) => onChange(index, e)}
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

      <div className="form-group">
        <label htmlFor={`uniqueId-${index}`}>Unique ID Number</label>
        <input
          type="text"
          id={`uniqueId-${index}`}
          name="uniqueId"
          placeholder="Unique ID"
          value={person.uniqueId}
          onChange={(e) => onChange(index, e)}
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
          onChange={(e) => onChange(index, e)}
          required
        />
      </div>
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
