import express from "express"
const router = express.Router();

// ambil data provinsi
router.get('/provinsi', async (req, res) => {
  try {
    const konselingData = await Konseling.findAll();
    const totalKonseling = await Konseling.count();
    res.status(200).json({konselingData,totalKonseling});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data konseling.' });
  }
});
