import express from "express"
const router = express.Router();

import DataOrangTuaMahasiswa from "../models/data_orangtua_wali";

router.post('/data-orangtua', async (req,res)=>{
    try{
        const dataOrangtuaMahasiswaCreate = await DataOrangTuaMahasiswa.create(req.body)
        return res.status(201).json({
            status:"success",
            message:"Data Orangtua Mahasiswa Berhasil dibuat",
            data:dataOrangtuaMahasiswaCreate
        })
    }catch(error){
        console.error("Error creating data orangtua mahasiswa:",error);

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