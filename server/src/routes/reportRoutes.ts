import express from 'express';
import Report from '../models/Report';

const router = express.Router();

// Route to submit a new report (public access)
router.post('/submit', async (req, res) => {
  const { peopleData, legalBusinessName, DBA } = req.body;

  // Validate that peopleData is an array and contains no more than 4 people
  if (!Array.isArray(peopleData) || peopleData.length === 0 || peopleData.length > 4) {
    res.status(400).json({ message: 'You must provide between 1 and 4 people.' });
    return;
  }

  // Validate required fields for each person
  for (let i = 0; i < peopleData.length; i++) {
    const person = peopleData[i];

    // Check required fields for each person
    if (!person.firstName || !person.lastName || !person.dateOfBirth || !person.uniqueId || 
        !person.idPicture || !person.address || !person.address.street || 
        !person.address.city || !person.address.state || !person.address.zipCode || 
        !person.email || !person.phoneNumber) {
      res.status(400).json({ message: `Person ${i + 1} has missing required fields.` });
      return;
    }

    // Validate email and phone number format
    const emailPattern = /.+@.+\..+/;
    const phonePattern = /^\d{10}$/;

    if (!emailPattern.test(person.email)) {
      res.status(400).json({ message: `Person ${i + 1} has an invalid email format.` });
      return;
    }

    if (!phonePattern.test(person.phoneNumber)) {
      res.status(400).json({ message: `Person ${i + 1} has an invalid phone number format.` });
      return;
    }
  }

  try {
    // Create a new report with the peopleData and business information
    const newReport = new Report({
      peopleData,
      legalBusinessName,
      DBA
    });

    // Save the new report to the database
    await newReport.save();

    // Respond with the newly created report
    res.status(201).json(newReport);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.status(400).json({ message: 'Error submitting report', error: err.message });
    } else {
      res.status(400).json({ message: 'Error submitting report', error: 'Unknown error' });
    }
  }
});

export default router;