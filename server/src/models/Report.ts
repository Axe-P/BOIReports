import mongoose from 'mongoose';

// Define person schema with updated fields (removes taxId)
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
      match: [/^\d{5}$/, 'Please provide a valid 5-digit zip code.'],
    },
  },
  uniqueId: {
    type: {
      type: String, // Removed enum validation
      required: true,
    },
    number: {
      type: String, // No restriction here
      required: true,
    },
  },
  idPicture: {
    type: String,
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
    type: [personSchema],
    required: true,
    validate: {
      validator: function (v: string) {
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
  taxIdType: {
    type: String, // Business Tax ID Type
    required: true,
    enum: ['EIN', 'SSN/TIN', 'Foreign'], // You can enforce enum validation for business tax ID type
  },
  taxIdNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model('Report', reportSchema);

export default Report;