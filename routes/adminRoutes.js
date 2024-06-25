const express = require('express');
const adminRouter = express.Router();
const { login, signup } = require('../controllers/adminController');
const validate = require('../middlewares/validateMiddleware');

const { validateAdminSignup } = require('../middlewares/validationSchemas');

adminRouter.post('/login', login);

adminRouter.post('/signup',  validate(validateAdminSignup), signup);

module.exports = adminRouter;
