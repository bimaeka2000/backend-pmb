
let urlPendaftaran = "/form/pendaftaran"
let urlDataBerkasCalonMahasiswa = "/form/form-berkas"
let urlDataOrangtuaCalonMahasiswa = "/form/form-orangtua"
let urlDataPendidikanCalonMahasiswa = "/form/form-pendidikan"
let urlDataProdiCalonMahasiswa = "/form/form-prodi"



// Pendaftaran
document.getElementById("form-pendaftaran").addEventListener("click", function () {
    window.location.href = urlPendaftaran;
});

// Data Berkas
document.getElementById("form-berkas").addEventListener("click", function () {
    window.location.href = urlDataBerkasCalonMahasiswa;
});

// Data Orangtua
document.getElementById("form-orangtua").addEventListener("click", function () {
    window.location.href = urlDataOrangtuaCalonMahasiswa;
});

// Data Pendidikan
document.getElementById("form-pendidikan").addEventListener("click", function () {
    window.location.href = urlDataPendidikanCalonMahasiswa;
});

// Data Prodi
document.getElementById("form-prodi").addEventListener("click", function () {
    window.location.href = urlDataProdiCalonMahasiswa;
});