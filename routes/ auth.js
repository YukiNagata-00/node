const express = require('express');
const router = express.Router();


router.get('/login', (req, res) => {
    res.render('../views/auth/login.ejs');
});
module.exports = router;