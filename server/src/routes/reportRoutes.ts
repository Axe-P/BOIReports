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
    income
  } = req.body;

  try {
    // Create a new report with the data
    const newReport = new Report({
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      address,
      uniqueId,
      idPicture,
      income
    });

    // Save the new report to the database
    await newReport.save();

    // Respond with the newly created report
    res.status(201).json(newReport);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error submitting report' });
  }
});

export default router;
