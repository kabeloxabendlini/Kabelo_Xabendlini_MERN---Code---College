const express = require('express');
const router = express.Router();

const { Signup, Login } = require('../Controllers/AuthController');
// ⛔ comment this out TEMPORARILY if not 100% sure it exists
// const { userVerification } = require('../Middlewares/AuthMiddleware');

router.post('/signup', Signup);
router.post('/login', Login);

// router.post('/', userVerification); // disable until verified

module.exports = router;
