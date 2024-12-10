// src/components/AddressForm.tsx

import React from 'react';
import { Address } from '../types/formTypes';

interface AddressFormProps {
  address: Address;
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  index: number;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onChange, index }) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={`street-${index}`}>Street</label>
        <input
          type="text"
          id={`street-${index}`}
          name="street"
          placeholder="Street"
          value={address.street}
          onChange={(e) => onChange(index, e)}
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
          value={address.city}
          onChange={(e) => onChange(index, e)}
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
          value={address.state}
          onChange={(e) => onChange(index, e)}
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
          value={address.zipCode}
          onChange={(e) => onChange(index, e)}
          required
        />
      </div>
    </>
  );
};

export default AddressForm;
