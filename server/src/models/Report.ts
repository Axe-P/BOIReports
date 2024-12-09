import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: false // middle name is optional
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  },
  uniqueId: {
    type: String, // passport or driver's license number
    required: true,
    unique: true
  },
  idPicture: {
    type: String, // URL to the uploaded image
    required: true
  },
  legalBusinessName: {
    type: String,
    required: true // newly added required field
  },
  DBA: {
    type: String, // newly added optional field
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Report = mongoose.model('Report', reportSchema);

export default Report;