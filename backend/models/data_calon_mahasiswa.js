import {DataTypes} from 'sequelize';
import sequelize from '../db.js';

const DataCalonMahasiswaBaru = sequelize.define('data_calon_mahasiswa',{
  nama_lengkap: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nik:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  nisn:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal_lahir:{
    type:DataTypes.STRING,
    allowNull:false
  },
  jenis_kelamin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  agama:{
    type:DataTypes.STRING,
    allowNull:false
  },
  alamat:{
    type:DataTypes.STRING,
    allowNull:false
  },
  provinsi:{
    type:DataTypes.STRING,
    allowNull:false
  },  
  kabupaten:{
    type:DataTypes.STRING,
    allowNull:false
  },
  kecamatan:{
    type:DataTypes.STRING,
    allowNull:false
  },
  kelurahan:{
    type:DataTypes.STRING,
    allowNull:false
  },
  kode_pos:{
    type:DataTypes.STRING,
    allowNull:false
  },
  nomor_hp:{
    type:DataTypes.STRING,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  pas_foto:{
    type:DataTypes.STRING,
    allowNull:false
  },
  tempat_lahir:{
    type:DataTypes.STRING,
    allowNull:false
  }
},
  {
    timestamps:false // enables timestamps);
  });

export default DataCalonMahasiswaBaru