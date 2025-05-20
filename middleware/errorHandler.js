module.exports = (err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError') {
    // Mongoose validation error
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    // duplicate key
    return res.status(400).json({ message: 'Duplicate field value entered' });
  }
  res.status(500).json({ message: 'Server Error' });
};