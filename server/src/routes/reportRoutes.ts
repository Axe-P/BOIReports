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
        !person.uniqueIdType || !person.taxIdentificationType || 
        !person.taxIdentification || !person.idPicture || !person.address || 
        !person.address.street || !person.address.city || !person.address.state || 
        !person.address.zipCode || !person.email || !person.phoneNumber) {
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

    // Validate the uniqueId based on its type
    const validUniqueIdPatterns = {
      'State-issued driver\'s license': /^\d+$/, // Numeric for driver's license
      'State/local/tribe-issued ID': /^\d+$/, // Numeric for state/local ID
      'U.S. passport': /^[A-Za-z0-9]+$/, // Alphanumeric for passport
      'Foreign passport': /^[A-Za-z0-9]+$/ // Alphanumeric for foreign passport
    };

    const uniqueIdPattern = validUniqueIdPatterns[person.uniqueIdType as keyof typeof validUniqueIdPatterns];
    if (!uniqueIdPattern || !uniqueIdPattern.test(person.uniqueId)) {
      res.status(400).json({ message: `Person ${i + 1} has an invalid unique ID number for the selected ID type.` });
      return;
    }

    // Validate the tax identification number (EIN, SSN/TIN, or Foreign)
    const validTaxIdPatterns = {
      'EIN': /^\d{9}$/, // 9 digits for EIN
      'SSN/TIN': /^\d{9}$/, // 9 digits for SSN/TIN
      'Foreign': /^[A-Za-z0-9]+$/ // Alphanumeric for Foreign tax ID
    };

    const taxIdPattern = validTaxIdPatterns[person.taxIdentificationType as keyof typeof validTaxIdPatterns];
    if (!taxIdPattern || !taxIdPattern.test(person.taxIdentification)) {
      res.status(400).json({ message: `Person ${i + 1} has an invalid tax identification number for the selected type.` });
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