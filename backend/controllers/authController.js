const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ================= REGISTER CUSTOMER =================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "customer",
    });

    await user.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= LOGIN (ADMIN + CUSTOMER) =================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded Admin
    if (email === "admin@gmail.com" && password === "admin") {
      return res.json({
        message: "Admin Login Successful",
        role: "admin",
      });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    res.json({
      message: "Login Successful",
      role: "customer",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};