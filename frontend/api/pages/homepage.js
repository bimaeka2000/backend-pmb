let urlInfoPendaftaran = "/info-pendaftaran"
let urlIndex = "/"
let urlBiayaKuliah = "/biaya-kuliah"
let urlFaq = "/faq"
let urlSarana = "/sarana"
let urlKegiatanMahasiswa = "/kegiatan-mahasiswa"


// ke halaman Info Pendaftaran
document.getElementById("pendaftaran").addEventListener("click", function () {
    window.location.href = urlInfoPendaftaran;
});

// ke halaman Index
document.getElementById("index").addEventListener("click", function () {
    window.location.href = urlIndex;
});

// ke halaman Biaya Kuliah
document.getElementById("biayakuliah").addEventListener("click", function () {
    window.location.href = urlBiayaKuliah;
});

// ke halaman FAQ
document.getElementById("faq").addEventListener("click", function () {
    window.location.href = urlFaq;
});

// ke halaman Sarana
document.getElementById("sarana").addEventListener("click", function () {
    window.location.href = urlSarana;
});

// ke halaman kegiatan-mahasiwswa
document.getElementById("kegiatan-mahasiswa").addEventListener("click", function () {
    window.location.href = urlKegiatanMahasiswa;
});
