const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

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

    // Send email notification
    try {
      await sendEmail({
        to: 'access@fracspace.com',
        subject: `New Contact Enquiry for Atithis Academy from ${name}`,
        text: `New contact enquiry received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
        html: `
          <h3>New Contact Enquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
      console.log('Notification email sent to access@fracspace.com');
    } catch (emailError) {
      console.error('Failed to send contact notification email:', emailError.message);
    }

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

