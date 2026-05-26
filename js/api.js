async function ambilData() {

  showLoading();

  try {

    const res =
      await fetch(READ_URL);

    const result =
      await res.json();

    const rows =
      result.values || [];

    const data = rows
      .slice(1)
      .map((row, index) => ({

        id: index + 2,

        tanggal:
          row[0] || '',

        jenis:
          row[1] || '',

        keterangan:
          row[2] || '',

        jumlah:
          row[3] || 0
      }));

    const dataKas =
      await ambilDataKas();

    renderKas(data, dataKas);

    renderSummary(data);

    renderRekap(data);

    renderRiwayat(data);

    renderChart(data);

  } finally {

    hideLoading();
  }
}

async function tambahData() {

  showLoading();

  try {

    const payload = {

      action: 'add',

      tanggal:
        document.getElementById('tanggal').value,

      jenis:
        document.getElementById('jenis').value,

      keterangan:
        document.getElementById('keterangan').value,

      jumlah:
        document.getElementById('jumlah').value,
    };

    await fetch(WRITE_URL, {

      method: 'POST',

      body: JSON.stringify(payload)
    });

    alert('Data berhasil ditambah');

    ambilData();

  } finally {

    hideLoading();
  }
}

async function updateData() {

  showLoading();

  try {

    const payload = {

      action: 'update',

      id: selectedIndex,

      tanggal:
        document.getElementById('tanggal').value,

      jenis:
        document.getElementById('jenis').value,

      keterangan:
        document.getElementById('keterangan').value,

      jumlah:
        document.getElementById('jumlah').value,
    };

    await fetch(WRITE_URL, {

      method: 'POST',

      body: JSON.stringify(payload)
    });

    alert('Data berhasil diupdate');

    selectedIndex = null;

    ambilData();

  } finally {

    hideLoading();
  }
}

async function hapusData(id) {

  const konfirmasi =
    confirm('Hapus data ini?');

  if(!konfirmasi) return;

  showLoading();

  try {

    await fetch(WRITE_URL, {

      method: 'POST',

      body: JSON.stringify({

        action: 'delete',

        id: id
      })
    });

    alert('Data berhasil dihapus');

    ambilData();

  } finally {

    hideLoading();
  }
}

async function editData(id) {

  const res =
    await fetch(READ_URL);

  const result =
    await res.json();

  const rows =
    result.values || [];

  const data = rows
    .slice(1)
    .map((row, index) => ({

      id: index + 2,

      tanggal:
        row[0] || '',

      jenis:
        row[1] || '',

      keterangan:
        row[2] || '',

      jumlah:
        row[3] || 0
    }));

  const item =
    data.find(i => i.id == id);

  document.getElementById('tanggal').value =
    item.tanggal;

  document.getElementById('jenis').value =
    item.jenis;

  document.getElementById('keterangan').value =
    item.keterangan;

  document.getElementById('jumlah').value =
    item.jumlah;

  selectedIndex = id;

  showPage('input');

  alert('Mode edit aktif');
}