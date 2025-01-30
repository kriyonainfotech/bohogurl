// multerConfig.js
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Save images to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Ensure that the file has a unique name
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid name collisions
  },
});

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/; // Allowed image formats
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedFileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb('Error: Only image files are allowed!');
  }
};

// Create the multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
