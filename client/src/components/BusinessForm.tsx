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
  setErrors: React.Dispatch<React.SetStateAction<string[]>>; // Set errors prop
}

const BusinessForm: React.FC<BusinessFormProps> = ({
  formData,
  setFormData,
  legalBusinessName,
  DBA,
  taxIdType,
  taxIdNumber,
  setErrors,
}) => {

  // Validation Functions
  const validateBusinessName = (name: string) => name.trim() !== '';
  const validateTaxIdNumber = (taxId: string) => /^\d{9}$/.test(taxId);  // 9 digits for valid tax ID
  const validateAddress = (address: { street: string; city: string; state: string; zipCode: string }) => {
    const { street, city, state, zipCode } = address;
    const errors: { [key: string]: string } = {};

    if (!street.trim()) errors.street = "Street is required.";
    if (!city.trim()) errors.city = "City is required.";
    if (!state.trim()) errors.state = "State is required.";
    if (!/^\d{5}$/.test(zipCode)) errors.zipCode = "Zip Code must be 5 digits.";

    return errors;
  };

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

  // Validate the form and return the errors
  const handleSubmit = () => {
    const newErrors: string[] = [];

    // Validate legal business name
    if (!validateBusinessName(legalBusinessName)) {
      newErrors.push("Legal Business Name is required.");
    }

    // Validate tax ID type
    if (!taxIdType) {
      newErrors.push("Business Tax ID Type is required.");
    }

    // Validate tax ID number
    if (!validateTaxIdNumber(taxIdNumber)) {
      newErrors.push("Business Tax ID Number must be 9 digits.");
    }

    // Validate address fields
    const addressErrors = validateAddress(formData.businessAddress);
    for (const error in addressErrors) {
      if (Object.prototype.hasOwnProperty.call(addressErrors, error)) {
        newErrors.push(addressErrors[error]);
      }
    }

    // Set errors state
    setErrors(newErrors);

    // Return false if errors exist to prevent submission
    return newErrors.length === 0;
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

      {/* Error Messages */}
      {formData.errors.length > 0 && (
        <div className="error-messages">
          <ul>
            {formData.errors.map((error: string, index: number) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <button type="button" onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
};

export default BusinessForm;