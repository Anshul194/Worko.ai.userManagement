const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const aadminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});



const Admin = mongoose.model('Admin', aadminSchema);

module.exports = Admin;
