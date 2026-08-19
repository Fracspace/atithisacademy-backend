const Admission = require('../models/Admission');
const sendEmail = require('../utils/sendEmail');

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

    // Send email notification
    try {
      await sendEmail({
        to: 'access@fracspace.com',
        subject: `New Admission Enquiry for Atithis Academy from ${name}`,
        text: `New admission enquiry received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
        html: `
          <h3>New Admission Enquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
      console.log('Notification email sent to access@fracspace.com');
    } catch (emailError) {
      console.error('Failed to send admission notification email:', emailError.message);
    }

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

