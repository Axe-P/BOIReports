// src/pages/FormPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormData, Person } from '../types/formTypes';
import PersonForm from '../components/PersonForm';
import BusinessForm from '../components/BusinessForm'; // Import the new BusinessForm component
import './FormPage.css';

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    legalBusinessName: '',
    DBA: '',
    taxIdType: '',
    taxIdNumber: '',
    businessAddress: { street: '', city: '', state: '', zipCode: '' },
    people: [{
      firstName: '', middleName: '', lastName: '', dateOfBirth: '',
      address: { street: '', city: '', state: '', zipCode: '' },
      uniqueIdType: '', uniqueIdNumber: '', email: '', phoneNumber: '', idPicture: '',
      errors: {}
    }],
  });

  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedPeople = [...formData.people];

    if (name in updatedPeople[index].address) {
      updatedPeople[index].address[name as keyof Person['address']] = value;
    } else {
      updatedPeople[index][name as keyof Omit<Person, 'address' | 'errors'>] = value;
    }
    setFormData({ ...formData, people: updatedPeople });
  };

  const addPerson = () => {
    if (formData.people.length < 4) {
      setFormData({
        ...formData,
        people: [...formData.people, {
          firstName: '', middleName: '', lastName: '', dateOfBirth: '',
          address: { street: '', city: '', state: '', zipCode: '' },
          uniqueIdType: '', uniqueIdNumber: '', email: '', phoneNumber: '', idPicture: '',
          errors: {}
        }]
      });
    }
  };

  const removePerson = (index: number) => {
    if (index === 0) return;
    const updatedPeople = formData.people.filter((_, i) => i !== index);
    setFormData({ ...formData, people: updatedPeople });
  };

  const validateName = (name: string) => /^[A-Za-z\s]{2,20}$/.test(name);
  const validateZipCode = (zip: string) => /^\d{5}$/.test(zip);
  const validateIdNumber = (id: string) => /^\d+$/.test(id);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phone: string) => /^\d{10}$/.test(phone);
  const validateTaxId = (taxId: string) => /^\d{9}$/.test(taxId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];
    const updatedPeople = [...formData.people];

    updatedPeople.forEach((person, index) => {
      const personErrors: { [key: string]: string } = {};

      if (!validateName(person.firstName)) personErrors.firstName = `First Name is invalid.`;
      if (!validateZipCode(person.address.zipCode)) personErrors.zipCode = `Zip Code is invalid.`;
      if (!validateIdNumber(person.uniqueIdNumber)) personErrors.uniqueIdNumber = `ID Number is invalid.`;
      if (!validateEmail(person.email)) personErrors.email = `Email is invalid.`;
      if (!validatePhoneNumber(person.phoneNumber)) personErrors.phoneNumber = `Phone Number is invalid.`;

      if (Object.keys(personErrors).length > 0) {
        updatedPeople[index].errors = personErrors;
        newErrors.push(...Object.values(personErrors));
      }
    });

    if (!formData.taxIdType) newErrors.push("Business tax ID Type is required.");
    if (!formData.taxIdNumber || !validateTaxId(formData.taxIdNumber)) newErrors.push("Business tax ID Number is invalid.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setFormData({ ...formData, people: updatedPeople });
      return;
    }

    const dataToSend = {
      legalBusinessName: formData.legalBusinessName,
      DBA: formData.DBA,
      taxId: {
        type: formData.taxIdType,
        number: formData.taxIdNumber,
      },
      businessAddress: formData.businessAddress,
      peopleData: formData.people.map(person => {
        const { uniqueIdType, uniqueIdNumber, ...personWithoutErrors } = person;
        return {
          ...personWithoutErrors,
          uniqueId: {
            type: uniqueIdType,
            number: uniqueIdNumber,
          },
        };
      }),
    };

    try {
      await axios.post('https://boireports.onrender.com/api/reports/submit', dataToSend, {
        headers: { 'Content-Type': 'application/json' },
      });
      navigate('/completion');
      window.open('https://square.link/u/lLLM2Z1e', '_blank');
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className="form-container" style={{ paddingTop: formData.people.length > 1 ? `${1150 * (formData.people.length - 1)}px` : '0' }}>
      <h1>Business and Person Details Form</h1>
      <p>Please fill in all the required fields below to submit your business and personal details.</p>

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
          <h2>Any person with at least 25% ownership in the business or any person who plays a significant role in the company must be included as a beneficial owner.</h2>
          <h3>All fields must be completed!</h3>
          <p>Upfront pricing: $125 to file your BOI Report</p>
        </div>

        <h2>Business Information</h2>
        <BusinessForm 
          legalBusinessName={formData.legalBusinessName}
          DBA={formData.DBA}
          taxIdType={formData.taxIdType}
          taxIdNumber={formData.taxIdNumber}
          formData={formData}
          setFormData={setFormData}
        />

        <h2>Beneficial Owner Information</h2>
        {formData.people.map((person, index) => (
          <PersonForm key={index} person={person} onChange={handleInputChange} index={index} removePerson={removePerson} errors={person.errors} />
        ))}

        {formData.people.length < 4 && (
          <button type="button" onClick={addPerson}>Add beneficial owner</button>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;