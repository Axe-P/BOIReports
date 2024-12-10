import mongoose from 'mongoose';

// Define person schema with updated fields
const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  // Update uniqueId field to store type and value
  uniqueId: {
    type: {
      type: String, // Type of ID (e.g., 'Driver\'s License', 'Passport', etc.)
      enum: ['Driver\'s License', 'State/Local/Tribe ID', 'U.S. Passport', 'Foreign Passport'],
      required: true,
    },
    number: {
      type: String, // The unique ID number itself
      required: true,
    },
  },
  // Update taxId field to be a nested object like uniqueId
  taxId: {
    type: {
      type: String,
      enum: ['EIN', 'SSN/TIN', 'Foreign'],
      required: true,
    },
    number: {
      type: String,
      required: true, // You can add format validation for SSN, EIN, etc.
    },
  },
  idPicture: {
    type: String, // URL to the uploaded image (optional)
    required: false,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Please provide a valid email address.'],
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number.'],
  },
}, { _id: false }); // Ensure each person does not get its own ID, since it's part of an array

// Define the report schema
const reportSchema = new mongoose.Schema({
  peopleData: {
    type: [personSchema], // This will hold an array of people data
    required: true,
    validate: {
      validator: function (v: any) {
        return v.length <= 4; // Ensure no more than 4 people
      },
      message: 'Cannot have more than 4 people.',
    },
  },
  legalBusinessName: {
    type: String,
    required: true,
  },
  DBA: {
    type: String, // Optional field
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model('Report', reportSchema);

export default Report;