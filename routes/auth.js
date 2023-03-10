const express = require('express');
const app = express();
const router = express.Router();
var path = require('path');


const {
    userRegister,
    userLogin,
    verifyToken,
    updateLoginCount,
    updateLearningCount
} = require('../controllers/auth');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'auth/login.html'));
});
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'auth/signup.html'));
});
router.get('/forgot', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'auth/forgot.html'));
});

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/verify-token', verifyToken);
router.post('/update-login-count', updateLoginCount);
router.post('/update-learning-count', updateLearningCount);
module.exports = router;