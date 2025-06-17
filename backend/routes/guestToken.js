const express = require('express');
const {v4: uuidv4} = require('uuid');
const router = express.Router();

router.get('/guest-token', (req,res) => {
    const guestToken = uuidv4();
    res.json({guestToken});
});

module.exports = router;