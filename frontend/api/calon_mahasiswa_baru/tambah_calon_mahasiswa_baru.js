
let url = "http://localhost:3000/pendaftaran/daftar"

document.getElementById("form-pendaftaran").addEventListener("submit",
    async function (event) {
        event.preventDefault()
        const nama_lengkap = document.getElementById("nama_lengkap").value;
        const nik = document.getElementById("nik").value;
        const nisn = document.getElementById("nisn").value;
        const alamat = document.getElementById("alamat").value;
        const provinsi = document.getElementById("provinsi").value;
        const kabupaten = document.getElementById("kabupaten").value;
        const kecamatan = document.getElementById("kecamatan").value;
        const kelurahan = document.getElementById("kelurahan").value;
        const kode_pos = document.getElementById("kode_pos").value;
        const tempat_lahir = document.getElementById("tempat_lahir").value;
        const tanggal_lahir = document.getElementById("tanggal_lahir").value;
        const jenis_kelamin = document.getElementById("jenis_kelamin").value;
        const agama = document.getElementById("agama").value;
        const nomor_hp = document.getElementById("nomor_hp").value;
        const email = document.getElementById("email").value;
        const pas_foto = document.getElementById("pas_foto").value;
        try{
            const calonMahasiswaBaru = {
                nama_lengkap : nama_lengkap,
                nik : nik,
                nisn : nisn,
                alamat:alamat,
                provinsi:provinsi,
                kabupaten:kabupaten,
                kecamatan:kecamatan,
                kelurahan:kelurahan,
                kode_pos:kode_pos,
                tempat_lahir : tempat_lahir,
                tanggal_lahir : tanggal_lahir,
                jenis_kelamin : jenis_kelamin,
                agama : agama,
                nomor_hp : nomor_hp,
                email : email,
                pas_foto : pas_foto,
            }
            const res= await fetch(url,{
                method:'POST',
                body:JSON.stringify(calonMahasiswaBaru),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if (!res.ok) {
              throw new Error(`Response status: ${res.status}`);
            }
            const data = await res.json();
            console.log("Sukses:", data);
          } catch (error) {
            console.error("Error:", error);
          }
              
        }

)