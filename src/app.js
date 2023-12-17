const express = require('express');
const mongoose = require('mongoose');

const productRoute = require('./routes/product');

const app = express();
app.use(express.json());

app.use('/api/v1', productRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status;
  const errorMessage = err.message;
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server running on port 3000...');
});
