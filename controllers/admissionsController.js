const Admission = require('../models/Admission');

/**
 * @desc    Submit a new admission enquiry
 * @route   POST /api/admissions
 * @access  Public
 */
const submitAdmission = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, message } = req.body;

    const newAdmission = new Admission({
      name,
      email,
      phoneNumber,
      message,
    });

    const savedAdmission = await newAdmission.save();

    res.status(201).json({
      success: true,
      message: 'Admission enquiry submitted successfully.',
      data: savedAdmission,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitAdmission,
};
