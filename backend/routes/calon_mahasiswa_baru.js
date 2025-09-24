import express from "express"
const router = express.Router();

import DataCalonMahasiswaBaru from "../models/data_calon_mahasiswa.js";

router.get('/index', async(req,res) => {
  location.assign('../form-pendaftaran.html')
})


router.post('/daftar', async (req, res) => {
  try {
    const body = req.body
    console.log(body);
    
    // const dataMahasiswaCreate = await DataCalonMahasiswaBaru.create(req.body);
    // res.status(201).send('created')
    // res.status(201).json(dataMahasiswaCreate);
    res.end('berhasil')
  } catch (error) {
    res.status(400).json("salah")
    // res.status(500).send('Gagal buat laporan konseling');
  }
});

export default router;