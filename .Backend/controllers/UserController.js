import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { userSendMail } from './userSendMail.js';

const { PORT, JWT_SECRET } = process.env;

function isMatch(password, confirm_password) {
  return password === confirm_password;
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return re.test(password);
}
function createActivationToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}
export const createUser = async (req, res) => {
  const { username, email, password, confirm_password, role = 'customer' } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: 'Password must include uppercase, lowercase, number, and be 6–20 characters.',
      });
    }

    if (!isMatch(password, confirm_password)) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const newUserPayload = {
      username,
      email: normalizedEmail,
      password: await bcrypt.hash(password, 10),
      role,
    };

    const activationToken = createActivationToken(newUserPayload);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    await userSendMail(normalizedEmail, activationUrl, "Verify your email address", "Confirm Email");

    res.json({ message: "Register Success! Please activate your email to start." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    if (!activation_token) {
      return res.status(400).json({ message: "No activation token provided." });
    }

    const userData = jwt.verify(activation_token, JWT_SECRET);
    const { username, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "Email already activated. Please login." });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(200).json({ message: "Account has been activated. Please login now!" });
  } catch (error) {
    console.error("Activation error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Activation token has expired. Please register again." });
    }
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Include userId and role in JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const allowedRoles = ['customer', 'admin'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: `Invalid role. Allowed roles: ${allowedRoles.join(', ')}` });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: `User role updated to ${role}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};