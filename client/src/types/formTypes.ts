export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

// This is the updated Person interface, which will include the person's address and other fields
export interface Person {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  address: Address;  // Address for the person
  email: string;
  uniqueIdType: string;       // This will now hold the unique ID type for the person (e.g., 'State-issued driver\'s license')
  uniqueIdNumber: string;     // This will hold the unique ID number (e.g., a driver's license number or passport number)
  phoneNumber: string;
  idPicture: string;
  errors: { [key: string]: string }; // Error tracking for form fields
}

// Here is the updated FormData interface that includes both business and people-related data
export interface FormData {
  legalBusinessName: string;   // Business name field
  DBA: string;                 // "Doing Business As" (optional)
  businessAddress: Address;    // New field for business address
  people: Person[];            // Array of people associated with the business
  taxIdType: string;           // Business tax ID type (e.g., 'EIN', 'SSN/TIN', 'Foreign')
  taxIdNumber: string;         // Business tax ID number
}