import express from 'express';
import Report from '../models/Report';

const router = express.Router();

// Route to submit a new report
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

// Route to get all reports (admin access)
router.get('/all', async (_req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reports' });
  }
});

// Route to delete a report by ID
router.delete('/delete/:id', async (req, res): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      res.status(404).json({ message: 'Report not found' });
      return;
    }

    res.status(200).json({ message: 'Report deleted successfully', deletedReport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting report' });
  }
});

export default router;