import express from "express"
const router = express.Router();

import DataPendidikanCalonMahasiswa from "../models/data_pendidikan_calon_mahasiswa";

await sequelize.sync({ force: true });

router.post('/data-pendidikan', async (req,res)=>{
    try{
        const calonMahasiswaId = req.session.calon_mahasiswa_id;
        console.log("Session sekarang:", req.session);
        if (!calonMahasiswaId) {
          return res.status(400).json({
            status: "fail",
            message: "Session mahasiswa belum ada, silakan daftar dulu"
          });
     }
        const dataPendidikanMahasiswaCreate = await DataPendidikanCalonMahasiswa.create({
            ...req.body,
            calon_mahasiswa_id:10
    })
        return res.status(201).json({
            status:"success",
            message:"Data Pendidikan Mahasiswa Berhasil dibuat",
            data:dataPendidikanMahasiswaCreate
        })
    }catch(error){
        console.error("Error creating data pendidikan mahasiswa:",error);

        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeValidationError'){
            const errors = error.errors ? error.errors.map(e => ({
                field : e.path,
                message : e.message
            })) : [{message: error.message}]
            
            return res.status(400).json({
                status:"fail",
                message:"Validasi data gagal",
                errors:errors
            })
    }
    // Error lainnya
    return res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan server",
    });
        }
})

export default router