

document.addEventListener("DOMContentLoaded", async () => {
  const selectProvinsi   = document.getElementById("provinsi");
  const selectKabupaten  = document.getElementById("kabupaten");
  const selectKecamatan  = document.getElementById("kecamatan");
  const selectKelurahan  = document.getElementById("kelurahan");

  // === 1. Ambil daftar provinsi ===
  try {
    const res = await fetch("/provinsi"); 
    const data = await res.json();

    selectProvinsi.innerHTML = "<option value=''>Pilih provinsi...</option>";

    data.data.forEach(prov => {
      const opt = document.createElement("option");
      opt.value = prov.code;
      opt.textContent = prov.name;
      selectProvinsi.appendChild(opt);
    });
  } catch (err) {
    console.error("Gagal load provinsi", err);
  }

  // === 2. Ketika provinsi dipilih, ambil kabupaten ===
  selectProvinsi.addEventListener("change", async () => {
    const provCode = selectProvinsi.value;
    if (!provCode) {
      selectKabupaten.innerHTML = "<option value=''>Pilih provinsi dulu</option>";
      selectKabupaten.disabled = true;
      return;
    }

    selectKabupaten.disabled = true;
    selectKabupaten.innerHTML = "<option value=''>Loading kabupaten...</option>";
    selectKecamatan.innerHTML = "<option value=''>Pilih kabupaten dulu</option>";
    selectKecamatan.disabled = true;
    selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
    selectKelurahan.disabled = true;

    try {
      const res = await fetch(`/kabupaten/${provCode}`);
      const data = await res.json();

      selectKabupaten.innerHTML = "<option value=''>Pilih kabupaten...</option>";
      data.data.forEach(kab => {
        const opt = document.createElement("option");
        opt.value = kab.code;
        opt.textContent = kab.name;
        selectKabupaten.appendChild(opt);
      });

      selectKabupaten.disabled = false;
    } catch (err) {
      console.error("Gagal load kabupaten", err);
      selectKabupaten.innerHTML = "<option value=''>Gagal memuat data</option>";
    }
  });

  // === 3. Ketika kabupaten dipilih, ambil kecamatan ===
  selectKabupaten.addEventListener("change", async () => {
    const kabCode = selectKabupaten.value;
    if (!kabCode) {
      selectKecamatan.innerHTML = "<option value=''>Pilih kabupaten dulu</option>";
      selectKecamatan.disabled = true;
      return;
    }

    selectKecamatan.disabled = true;
    selectKecamatan.innerHTML = "<option value=''>Loading kecamatan...</option>";
    selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
    selectKelurahan.disabled = true;

    try {
      const res = await fetch(`/kecamatan/${kabCode}`);
      const data = await res.json();

      selectKecamatan.innerHTML = "<option value=''>Pilih kecamatan...</option>";
      data.data.forEach(kec => {
        const opt = document.createElement("option");
        opt.value = kec.code;
        opt.textContent = kec.name;
        selectKecamatan.appendChild(opt);
      });

      selectKecamatan.disabled = false;
    } catch (err) {
      console.error("Gagal load kecamatan", err);
      selectKecamatan.innerHTML = "<option value=''>Gagal memuat data</option>";
    }
  });

  // === 4. Ketika kecamatan dipilih, ambil kelurahan ===
  selectKecamatan.addEventListener("change", async () => {
    const kecCode = selectKecamatan.value;
    if (!kecCode) {
      selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
      selectKelurahan.disabled = true;
      return;
    }

    selectKelurahan.disabled = true;
    selectKelurahan.innerHTML = "<option value=''>Loading kelurahan...</option>";

    try {
      const res = await fetch(`/kelurahan/${kecCode}`);
      const data = await res.json();

      selectKelurahan.innerHTML = "<option value=''>Pilih kelurahan...</option>";
      data.data.forEach(desa => {
        const opt = document.createElement("option");
        opt.value = desa.code;
        opt.textContent = desa.name;
        selectKelurahan.appendChild(opt);
      });

      selectKelurahan.disabled = false;
    } catch (err) {
      console.error("Gagal load kelurahan", err);
      selectKelurahan.innerHTML = "<option value=''>Gagal memuat data</option>";
    }
  });
});