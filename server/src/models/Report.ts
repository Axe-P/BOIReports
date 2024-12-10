import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: false
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
  }
}, { _id: false });  // Ensures that each person does not get its own ID, since it's part of an array

const reportSchema = new mongoose.Schema({
  legalBusinessName: {
    type: String,
    required: true
  },
  DBA: {
    type: String, // optional field
    required: false
  },
  peopleData: {
    type: [personSchema], // This will hold an array of people data
    required: true,
    validate: {
      validator: function (v: any) {
        return v.length <= 4; // Ensure no more than 4 people
      },
      message: 'Cannot have more than 4 people.'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Report = mongoose.model('Report', reportSchema);

export default Report;