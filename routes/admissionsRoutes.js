const express = require('express');
const { submitAdmission } = require('../controllers/admissionsController');
const { validateEnquiry } = require('../middleware/validateRequest');

const router = express.Router();

router.post('/', validateEnquiry, submitAdmission);

module.exports = router;
