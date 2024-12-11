// src/components/BusinessForm.tsx

import React from 'react';
import { FormData } from '../types/formTypes';
import AddressForm from './AddressForm'; // Import AddressForm component

interface BusinessFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  legalBusinessName: string;
  DBA: string;
  taxIdType: string;
  taxIdNumber: string;
}

const BusinessForm: React.FC<BusinessFormProps> = ({
  formData,
  setFormData,
  legalBusinessName,
  DBA,
  taxIdType,
  taxIdNumber,
}) => {

  // Generic onChange handler for the form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle Address changes - takes index and event (this ensures compatibility with AddressForm)
  const handleAddressChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      businessAddress: {
        ...prevFormData.businessAddress,
        [name]: value,
      },
    }));
  };

  return (
    <div className="business-form">
      {/* Legal Business Name */}
      <div className="form-group">
        <label htmlFor="legalBusinessName">Legal Business Name</label>
        <input
          type="text"
          id="legalBusinessName"
          name="legalBusinessName"
          placeholder="Legal Business Name"
          value={legalBusinessName}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* DBA */}
      <div className="form-group">
        <label htmlFor="DBA">DBA (Doing Business As)</label>
        <input
          type="text"
          id="DBA"
          name="DBA"
          placeholder="DBA (Optional)"
          value={DBA}
          onChange={handleInputChange}
        />
      </div>

      {/* Business Tax ID Type */}
      <div className="form-group">
        <label htmlFor="taxIdType">Business Tax ID Type</label>
        <select
          id="taxIdType"
          name="taxIdType"
          value={taxIdType}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Tax ID Type</option>
          <option value="EIN">EIN</option>
          <option value="SSN/TIN">SSN/TIN</option>
          <option value="Foreign">Foreign</option>
        </select>
      </div>

      {/* Business Tax ID Number */}
      <div className="form-group">
        <label htmlFor="taxIdNumber">Business Tax ID Number</label>
        <input
          type="text"
          id="taxIdNumber"
          name="taxIdNumber"
          value={taxIdNumber}
          onChange={handleInputChange}
          placeholder="Enter business tax ID"
          required
        />
      </div>

      {/* Business Address Form */}
      <h3>Business Address</h3>
      <AddressForm
        address={formData.businessAddress} // Bind the business address
        onChange={handleAddressChange} // Pass the handleAddressChange function
        index={0} // Pass index 0, as there's only one address in this case
      />
    </div>
  );
};

export default BusinessForm;