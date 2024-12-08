// server/server.js
const connectDB = require('./config/db');
const express = require('express');
const authRoutes = require('./routes/authRoutes')
const cors = require('cors');
const friendRoutes = require('./routes/friendRoutes')

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log("hi");
connectDB();
console.log("hi");

// Routes (to be added later)
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendRoutes);
const router = express.Router();

// router.post('/signup', signup);
// router.post('/login', login);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));