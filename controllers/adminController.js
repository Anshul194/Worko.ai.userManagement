const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminService = require("../services/adminService");
const SuccessHandler = require("../SuccessResponse");


// login api for admin

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminService.getByEmail(email);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return SuccessHandler.sendResponse(
      res,
      { token },
      "Admin Login successfully"
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};


// Signup api for admin

const signup = async (req, res) => {
  const { email, name, password } = req.body;

  console.log(`Received signup request for email: ${email}`);
  try {
    let admin = await AdminService.getByEmail(email);
    if (admin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    admin = await AdminService.createAdmin({ email, name, password });

    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(`Admin created successfully: ${admin._id}`);
    return SuccessHandler.sendResponse(
      res,
      { token },
      "Admin created successfully"
    );
  } catch (error) {
    console.error(`Error in signup: ${error.message}`);
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { login, signup };
