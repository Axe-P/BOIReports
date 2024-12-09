import express from 'express';
import Report from '../models/Report';

const router = express.Router();

// Route to submit a new report (public access)
router.post('/submit', async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    address,
    uniqueId,
    idPicture,
    legalBusinessName, // New required field
    DBA // New optional field
  } = req.body;

  try {
    // Validate required fields
    if (!legalBusinessName) {
      res.status(400).json({ message: 'Legal Business Name is required.' });
      return;
    }

    // Create a new report with the data
    const newReport = new Report({
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      address,
      uniqueId,
      idPicture,
      legalBusinessName,
      DBA // Optional field; will be undefined if not provided
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