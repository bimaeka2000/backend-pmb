import express from "express"
import cors from "cors";
import daftarCalonMahasiswaBaru from "./routes/calon_mahasiswa_baru.js"

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000
const app = express()

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "..", "frontend", "form-pendaftaran.html"));
  });

app.get("/provinsi", async (req, res) => {
  try {
    const response = await fetch("https://wilayah.id/api/provinces.json");
    const data = await response.json();
    res.json(data); // kirim ke frontend
  } catch (error) {
    res.status(500).json({ error: "Gagal fetch data" });
  }
});


app.get("/kabupaten/:provCode", async (req, res) => {
  try {
    const response = await fetch(`https://wilayah.id/api/regencies/${req.params.provCode}.json`);
    const data = await response.json();
    res.json(data); // kirim ke frontend
  } catch (error) {
    res.status(500).json({ error: "Gagal fetch data" });
  }
});

app.get("/kecamatan/:kabCode", async (req, res) => {
  try {
    const response = await fetch(`https://wilayah.id/api/districts/${req.params.kabCode}.json`);
    const data = await response.json();
    res.json(data); // kirim ke frontend
  } catch (error) {
    res.status(500).json({ error: "Gagal fetch data" });
  }
});

app.get("/kelurahan/:kecCode", async (req, res) => {
  try {
    const response = await fetch(`https://wilayah.id/api/villages/${req.params.kecCode}.json`);
    const data = await response.json();
    res.json(data); // kirim ke frontend
  } catch (error) {
    res.status(500).json({ error: "Gagal fetch data" });
  }
});

app.use('/pendaftaran',daftarCalonMahasiswaBaru)

app.listen(PORT,() => console.log(`Server running on port : http://localhost:${PORT}`))