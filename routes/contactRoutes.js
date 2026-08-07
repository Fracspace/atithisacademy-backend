const express = require('express');
const { submitContact } = require('../controllers/contactController');
const { validateEnquiry } = require('../middleware/validateRequest');

const router = express.Router();

router.post('/', validateEnquiry, submitContact);

module.exports = router;
