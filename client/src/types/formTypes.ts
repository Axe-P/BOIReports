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
  uniqueIdType: string;       // New field for unique ID type (dropdown)
  uniqueIdNumber: string;     // New field for the unique ID number
  taxIdType: string;          // New field for tax ID type (dropdown)
  taxIdNumber: string;        // New field for the tax ID number
  email: string;
  phoneNumber: string;
  idPicture: string;
  errors: { [key: string]: string }; // Error tracking for form fields
}

export interface FormData {
  legalBusinessName: string;
  DBA: string;
  people: Person[];
}