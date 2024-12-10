// src/types/formTypes.ts

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
    uniqueId: string;
    email: string;
    phoneNumber: string;
    idPicture: string;
    errors: { [key: string]: string }; // Add errors property
  }
  
  export interface FormData {
    legalBusinessName: string;
    DBA: string;
    people: Person[];
  }
  