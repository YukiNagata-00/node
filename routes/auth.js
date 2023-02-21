const express = require('express');
const app = express();
const router = express.Router();
var path = require('path');


router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'auth/login.html'));
});
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'auth/signup.html'));
});
router.get('/confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'auth/confirmation.html'));
});
module.exports = router;