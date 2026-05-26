async function tambahKasKeluar() {

  showLoading();

  try {

    const payload = {

      sheet: 'Kas',

      action: 'add',

      tanggal:
        document.getElementById('kasTanggal').value,

      jenis: 'pengeluaran',

      keterangan:
        document.getElementById('kasKeterangan').value,

      jumlah:
        document.getElementById('kasJumlah').value,
    };

    await fetch(WRITE_URL, {

      method: 'POST',

      body: JSON.stringify(payload)
    });

    alert('Pengeluaran kas berhasil ditambah');

    ambilData();

  } finally {

    hideLoading();
  }
}

async function ambilDataKas() {

  const res =
    await fetch(READ_KAS_URL);

  const result =
    await res.json();

  const rows =
    result.values || [];

  return rows
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
}

async function hapusKas(id) {

  if(!confirm('Hapus data kas?')) return;

  showLoading();

  try {

    await fetch(WRITE_URL, {

      method: 'POST',

      body: JSON.stringify({

        sheet: 'Kas',

        action: 'delete',

        id: id
      })
    });

    ambilData();

  } finally {

    hideLoading();
  }
}

async function editKas(id) {

  const dataKas =
    await ambilDataKas();

  const item =
    dataKas.find(x => x.id == id);

  if(!item) return;

  const tanggal =
    prompt(
      'Tanggal',
      item.tanggal
    );

  const keterangan =
    prompt(
      'Keterangan',
      item.keterangan
    );

  const jumlah =
    prompt(
      'Jumlah',
      item.jumlah
    );

  if(!tanggal || !jumlah) return;

  showLoading();

  try {

    await fetch(WRITE_URL, {

      method: 'POST',

      body: JSON.stringify({

        sheet: 'Kas',

        action: 'update',

        id: id,

        tanggal: tanggal,

        jenis: 'pengeluaran',

        keterangan: keterangan,

        jumlah: jumlah
      })
    });

    alert('Data kas berhasil diupdate');

    ambilData();

  } finally {

    hideLoading();
  }
}

function renderKas(dataKeuangan, dataKas) {

  const tbodyKasMasuk =
    document.getElementById('tbodyKasMasuk');

  const tbodyKasKeluar =
    document.getElementById('tbodyKasKeluar');

  tbodyKasMasuk.innerHTML = '';
  tbodyKasKeluar.innerHTML = '';

  // PEMASUKAN KAS
  const pemasukanKas = dataKeuangan.filter(item =>

    item.jenis === 'pengeluaran' &&

    item.keterangan
      .trim()
      .toLowerCase() === 'kas'
  );

  let totalKasMasuk = 0;

  pemasukanKas
    .sort((a,b) =>
      new Date(b.tanggal) - new Date(a.tanggal)
    )

    .forEach(item => {

      totalKasMasuk += Number(item.jumlah);

      tbodyKasMasuk.innerHTML += `

        <tr class="border-b">

          <td class="p-3">
            ${item.tanggal}
          </td>

          <td class="p-3">
            Setoran Kas
          </td>

          <td class="p-3">
            Rp ${Number(item.jumlah)
              .toLocaleString('id-ID')}
          </td>

        </tr>
      `;
    });

  document.getElementById(
    'totalKasMasuk'
  ).innerText =
    'Rp ' +
    totalKasMasuk.toLocaleString('id-ID');

  // PENGELUARAN KAS
  const pengeluaranKas = dataKas.filter(item =>

    item.jenis === 'pengeluaran'
  );

  let totalKasKeluar = 0;

  pengeluaranKas
    .sort((a,b) =>
      new Date(b.tanggal) - new Date(a.tanggal)
    )

    .forEach(item => {

      totalKasKeluar += Number(item.jumlah);

      tbodyKasKeluar.innerHTML += `

        <tr class="border-b">

          <td class="p-3">
            ${item.tanggal}
          </td>

          <td class="p-3">
            ${item.keterangan}
          </td>

          <td class="p-3">
            Rp ${Number(item.jumlah)
              .toLocaleString('id-ID')}
          </td>

          <td class="p-3 text-center">

            <button
              onclick="editKas(${item.id})"
              class="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
            >
              Edit
            </button>

            <button
              onclick="hapusKas(${item.id})"
              class="bg-red-600 text-white px-3 py-1 rounded"
            >
              Hapus
            </button>

          </td>

        </tr>
      `;
    });

  const saldoKasGlobal =
    totalKasMasuk - totalKasKeluar;

  document.getElementById(
    'totalKasKeluar'
  ).innerText =
    'Rp ' +
    totalKasKeluar.toLocaleString('id-ID');

  document.getElementById(
    'saldoKas'
  ).innerText =
    'Rp ' +
    saldoKasGlobal.toLocaleString('id-ID');

  document.getElementById(
    'saldoKasGlobal'
  ).innerText =
    'Rp ' +
    saldoKasGlobal.toLocaleString('id-ID');
}