const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { verifyToken } = require('./auth');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.dntt4mxry,
  api_key: process.env.Yo9b0HxVDIO1a8J7o9LdiLTt,
  api_secret: process.env.rzp_live_Su1hNItefRyphU
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/image', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'alnasr-products' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });
    
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;