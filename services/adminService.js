const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');

const getByEmail = async (email) => {
    return await Admin.findOne({ email });
};

const createAdmin = async (adminData) => {
    const { email, name, password } = adminData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, name, password: hashedPassword });
    return await admin.save();
};

module.exports = { getByEmail, createAdmin };
