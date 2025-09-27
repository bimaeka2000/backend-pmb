import express from "express"
import cors from "cors";
import daftarCalonMahasiswaBaru from "./routes/calon_mahasiswa_baru.js"
import authentication from "./routes/authentication.js"
import chart from "./routes/chart.js"
import { fileURLToPath } from 'url';
import path from 'path';
import session from "express-session";
import multer from "multer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000
const app = express()
app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.use(
  session({
    secret: "testing",   // ganti dengan secret yang aman
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false,httpOnly: true } // kalau HTTPS ganti jadi true
  })
);

// Middleware khusus buat error Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        status: "error",
        message: "Ukuran file maksimal 1 MB!"
      });
    }
  }
  next(err);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,"..", "frontend", "page", "form-pendaftaran.html"));
  });

    app.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname, "..", "frontend", "page", "dashboard.html"));
  });

  // #NOTE FORM PENDIDIKAN
   app.get('/form-pendidikan',function(req,res){
      res.sendFile(path.join(__dirname,"..", "frontend", "page", "form-pendidikan.html"));
  })

    app.get('/form-prodi',function(req,res){
      res.sendFile(path.join(__dirname,"..", "frontend", "page", "form-pilihan-prodi.html"));
  })
  app.get('/form-berkas',function(req,res){
      res.sendFile(path.join(__dirname,"..", "frontend", "page", "form-berkas.html"));
  })

    // #NOTE FORM ORANGTUA
  app.get('/form-orangtua',function(req,res){
      res.sendFile(path.join(__dirname, "..", "frontend", "page", "form-data-orangtua.html"));
  })

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

app.use('/chart', chart)
app.use('/login',authentication)
app.use('/pendaftaran',daftarCalonMahasiswaBaru)

app.listen(PORT,() => console.log(`Server running on port : http://localhost:${PORT}`))