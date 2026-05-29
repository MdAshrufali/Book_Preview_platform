const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const { routes } = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health + API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Not Found' });
});

app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server listening on port ${port}`);
});

