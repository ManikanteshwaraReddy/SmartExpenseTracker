const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('Detailed MongoDB Connection Error:', err);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/deals', require('./routes/dealRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
