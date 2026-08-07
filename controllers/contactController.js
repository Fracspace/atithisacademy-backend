const Contact = require('../models/Contact');

/**
 * @desc    Submit a new contact enquiry
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      phoneNumber,
      message,
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Contact enquiry submitted successfully.',
      data: savedContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
};
