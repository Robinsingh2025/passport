const express = require('express');

const router = express.Router();

router.get('/testing', (req, res) => res.send('Welcome'));

module.exports = router;
