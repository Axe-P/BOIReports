import express, { Request, Response } from 'express';
import Report from '../models/Report';
import authMiddleware from '../middlewares/authMiddleware'; // Import auth middleware

const router = express.Router();

// Route to get all reports (accessible only to superuser)
router.get('/all', authMiddleware, async (_req: Request, res: Response) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reports' });
  }
});

// Route to delete a report by uniqueId (accessible only to superuser)
router.delete('/delete/:uniqueId', authMiddleware, async (req: Request, res: Response) => {
  const { uniqueId } = req.params;  // Get the uniqueId from the route parameters

  try {
    // Find the report by uniqueId
    const deletedReport = await Report.findOneAndDelete({ uniqueId });

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