

// document.addEventListener("DOMContentLoaded", async () => {
//   const selectProvinsi   = document.getElementById("provinsi");
//   const selectKabupaten  = document.getElementById("kabupaten");
//   const selectKecamatan  = document.getElementById("kecamatan");
//   const selectKelurahan  = document.getElementById("kelurahan");

//   // === 1. Ambil daftar provinsi ===
//   try {
//     const res = await fetch("/provinsi"); 
//     const data = await res.json();

//     selectProvinsi.innerHTML = "<option value=''>Pilih provinsi...</option>";

//     data.data.forEach(prov => {
//       const opt = document.createElement("option");
//       opt.value = prov.code;
//       // optCode.value = prov.code
//       opt.textContent = prov.name;
//       selectProvinsi.appendChild(opt);
//     });
//   } catch (err) {
//     console.error("Gagal load provinsi", err);
//   }

//   // === 2. Ketika provinsi dipilih, ambil kabupaten ===
//   selectProvinsi.addEventListener("change", async () => {
//     const provCode = selectProvinsi.value;
//     if (!provCode) {
//       selectKabupaten.innerHTML = "<option value=''>Pilih provinsi dulu</option>";
//       selectKabupaten.disabled = true;
//       return;
//     }

//     selectKabupaten.disabled = true;
//     selectKabupaten.innerHTML = "<option value=''>Loading kabupaten...</option>";
//     selectKecamatan.innerHTML = "<option value=''>Pilih kabupaten dulu</option>";
//     selectKecamatan.disabled = true;
//     selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
//     selectKelurahan.disabled = true;

//     try {
//       const res = await fetch(`/kabupaten/${provCode}`);
//       const data = await res.json();

//       selectKabupaten.innerHTML = "<option value=''>Pilih kabupaten...</option>";
//       data.data.forEach(kab => {
//         const opt = document.createElement("option");
//         opt.value = kab.code;
//         opt.textContent = kab.name;
//         selectKabupaten.appendChild(opt);
//       });

//       selectKabupaten.disabled = false;
//     } catch (err) {
//       console.error("Gagal load kabupaten", err);
//       selectKabupaten.innerHTML = "<option value=''>Gagal memuat data</option>";
//     }
//   });

//   // === 3. Ketika kabupaten dipilih, ambil kecamatan ===
//   selectKabupaten.addEventListener("change", async () => {
//     const kabCode = selectKabupaten.value;
//     if (!kabCode) {
//       selectKecamatan.innerHTML = "<option value=''>Pilih kabupaten dulu</option>";
//       selectKecamatan.disabled = true;
//       return;
//     }

//     selectKecamatan.disabled = true;
//     selectKecamatan.innerHTML = "<option value=''>Loading kecamatan...</option>";
//     selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
//     selectKelurahan.disabled = true;

//     try {
//       const res = await fetch(`/kecamatan/${kabCode}`);
//       const data = await res.json();

//       selectKecamatan.innerHTML = "<option value=''>Pilih kecamatan...</option>";
//       data.data.forEach(kec => {
//         const opt = document.createElement("option");
//         opt.value = kec.code;
//         opt.textContent = kec.name;
//         selectKecamatan.appendChild(opt);
//       });

//       selectKecamatan.disabled = false;
//     } catch (err) {
//       console.error("Gagal load kecamatan", err);
//       selectKecamatan.innerHTML = "<option value=''>Gagal memuat data</option>";
//     }
//   });

//   // === 4. Ketika kecamatan dipilih, ambil kelurahan ===
//   selectKecamatan.addEventListener("change", async () => {
//     const kecCode = selectKecamatan.value;
//     if (!kecCode) {
//       selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
//       selectKelurahan.disabled = true;
//       return;
//     }

//     selectKelurahan.disabled = true;
//     selectKelurahan.innerHTML = "<option value=''>Loading kelurahan...</option>";

//     try {
//       const res = await fetch(`/kelurahan/${kecCode}`);
//       const data = await res.json();

//       selectKelurahan.innerHTML = "<option value=''>Pilih kelurahan...</option>";
//       data.data.forEach(desa => {
//         const opt = document.createElement("option");
//         opt.value = desa.code;
//         opt.textContent = desa.name;
//         selectKelurahan.appendChild(opt);
//       });

//       selectKelurahan.disabled = false;
//     } catch (err) {
//       console.error("Gagal load kelurahan", err);
//       selectKelurahan.innerHTML = "<option value=''>Gagal memuat data</option>";
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", async () => {
  const selectProvinsi   = document.getElementById("provinsi");
  const selectKabupaten  = document.getElementById("kabupaten");
  const selectKecamatan  = document.getElementById("kecamatan");
  const selectKelurahan  = document.getElementById("kelurahan");

  let provinsiMap = {};    // { name: code }
  let kabupatenMap = {};   // { name: code }
  let kecamatanMap = {};   // { name: code }

  async function loadDropdown(url, select, placeholder, map = null) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      select.innerHTML = `<option value="">${placeholder}</option>`;
      if (map) map = {}; // reset map jika ada

      data.data.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.name; // value = name untuk form/backend
        opt.textContent = item.name;
        select.appendChild(opt);

        if (map) map[item.name] = item.code; // simpan mapping name→code
      });

      select.disabled = false;
      return map;
    } catch (err) {
      console.error(`Gagal load ${placeholder}`, err);
      select.innerHTML = `<option value="">Gagal memuat data</option>`;
      select.disabled = true;
      return map;
    }
  }

  // 1. Load provinsi
  provinsiMap = await loadDropdown("/provinsi", selectProvinsi, "Pilih provinsi...", provinsiMap);

  // 2. Load kabupaten ketika provinsi dipilih
  selectProvinsi.addEventListener("change", async () => {
    const provName = selectProvinsi.value;
    if (!provName) {
      selectKabupaten.innerHTML = "<option value=''>Pilih provinsi dulu</option>";
      selectKabupaten.disabled = true;
      selectKecamatan.innerHTML = "<option value=''>Pilih kabupaten dulu</option>";
      selectKecamatan.disabled = true;
      selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
      selectKelurahan.disabled = true;
      return;
    }

    const provCode = provinsiMap[provName];

    selectKabupaten.disabled = true;
    selectKabupaten.innerHTML = "<option value=''>Loading kabupaten...</option>";
    selectKecamatan.innerHTML = "<option value=''>Pilih kabupaten dulu</option>";
    selectKecamatan.disabled = true;
    selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
    selectKelurahan.disabled = true;

    kabupatenMap = await loadDropdown(`/kabupaten/${provCode}`, selectKabupaten, "Pilih kabupaten...", kabupatenMap);
  });

  // 3. Load kecamatan ketika kabupaten dipilih
  selectKabupaten.addEventListener("change", async () => {
    const kabName = selectKabupaten.value;
    if (!kabName) {
      selectKecamatan.innerHTML = "<option value=''>Pilih kabupaten dulu</option>";
      selectKecamatan.disabled = true;
      selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
      selectKelurahan.disabled = true;
      return;
    }

    const kabCode = kabupatenMap[kabName];

    selectKecamatan.disabled = true;
    selectKecamatan.innerHTML = "<option value=''>Loading kecamatan...</option>";
    selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
    selectKelurahan.disabled = true;

    kecamatanMap = await loadDropdown(`/kecamatan/${kabCode}`, selectKecamatan, "Pilih kecamatan...", kecamatanMap);
  });

  // 4. Load kelurahan ketika kecamatan dipilih
  selectKecamatan.addEventListener("change", async () => {
    const kecName = selectKecamatan.value;
    if (!kecName) {
      selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
      selectKelurahan.disabled = true;
      return;
    }

    const kecCode = kecamatanMap[kecName];

    selectKelurahan.disabled = true;
    await loadDropdown(`/kelurahan/${kecCode}`, selectKelurahan, "Pilih kelurahan...");
  });
});
