export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Person {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  address: Address;
  email: string;
  uniqueIdType: string;       // This will now hold the unique ID type for the person (e.g., 'State-issued driver\'s license')
  uniqueIdNumber: string;     // This will hold the unique ID number (e.g., a driver's license number or passport number)
  phoneNumber: string;
  idPicture: string;
  errors: { [key: string]: string }; // Error tracking for form fields
}

export interface FormData {
  legalBusinessName: string;   // Business name field
  DBA: string;                 // "Doing Business As" (optional)
  people: Person[];            // Array of people associated with the business
  taxIdType: string;           // Business tax ID type (e.g., 'EIN', 'SSN/TIN', 'Foreign')
  taxIdNumber: string;         // Business tax ID number
}