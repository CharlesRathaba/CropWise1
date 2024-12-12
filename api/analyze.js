const express = require("express");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

// Configure multer for memory storage instead of disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle file upload
    upload.single('image')(req, res, async function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      
      if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded" });
      }

      const imageBuffer = req.file.buffer;
      const imageBase64 = imageBuffer.toString('base64');

      // Use the Gemini model to analyze the image
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([
        `Analyze this plant image for South African farming conditions, considering local climate and common regional diseases. Provide detailed analysis of its species, health, and care recommendations. Include locally available treatment options and preventive measures specific to South African agriculture.`,
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: imageBase64,
          },
        },
      ]);

      const plantInfo = result.response.text();

      res.json({
        result: plantInfo,
        image: `data:${req.file.mimetype};base64,${imageBase64}`,
      });
    });
  } catch (error) {
    console.error("Error analyzing image:", error);
    res.status(500).json({ error: "An error occurred while analyzing the image" });
  }
}; 