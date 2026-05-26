function renderRekap(data) {

  const tbodyPemasukan =
    document.getElementById('tbodyPemasukan');

  const tbodyPengeluaran =
    document.getElementById('tbodyPengeluaran');

  tbodyPemasukan.innerHTML = '';
  tbodyPengeluaran.innerHTML = '';

  let totalPemasukan = 0;
  let totalPengeluaran = 0;

  const filterBulan =
    document.getElementById('filterBulan').value;

  if(filterBulan) {

    data = data.filter(item => {

      const bulan =
        item.tanggal.split('-')[1];

      return bulan === filterBulan;
    });
  }

  data.reverse().forEach((item, index) => {

    const jumlah =
      Number(item.jumlah);

    const row = `

      <tr class="border-b">

        <td class="p-3">
          ${item.tanggal}
        </td>

        <td class="p-3">
          ${item.keterangan}
        </td>

        <td class="p-3">
          Rp ${jumlah.toLocaleString('id-ID')}
        </td>

      </tr>
    `;


    if(item.jenis === 'pemasukan') {

      totalPemasukan += jumlah;

      tbodyPemasukan.innerHTML += row;
    }

    if(item.jenis === 'pengeluaran') {

      totalPengeluaran += jumlah;

      tbodyPengeluaran.innerHTML += row;
    }

  });

  document.getElementById(
    'totalPemasukanTabel'
  ).innerText =
    'Rp ' +
    totalPemasukan.toLocaleString('id-ID');

  document.getElementById(
    'totalPengeluaranTabel'
  ).innerText =
    'Rp ' +
    totalPengeluaran.toLocaleString('id-ID');

  const sisaSaldo =
    totalPemasukan - totalPengeluaran;

  document.getElementById(
    'sisaSaldoTabel'
  ).innerText =
    'Rp ' +
    sisaSaldo.toLocaleString('id-ID');
}

function renderRiwayat(data) {

  const tbodyRiwayat =
    document.getElementById('tbodyRiwayat');

  tbodyRiwayat.innerHTML = '';

  data
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    .forEach(item => {

      const jumlah =
        Number(item.jumlah);

      tbodyRiwayat.innerHTML += `

        <tr class="border-b">

          <td class="p-3">
            ${item.tanggal}
          </td>

          <td class="p-3">
            ${item.jenis}
          </td>

          <td class="p-3">
            ${item.keterangan}
          </td>

          <td class="p-3">
            Rp ${jumlah.toLocaleString('id-ID')}
          </td>

          <td class="p-3 text-center">

            <button
              onclick="editData(${item.id})"
              class="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
            >
              Edit
            </button>

            <button
              onclick="hapusData(${item.id})"
              class="bg-red-600 text-white px-3 py-1 rounded"
            >
              Hapus
            </button>

          </td>

        </tr>
      `;
    });
}

function renderSummary(data) {

  const pemasukan = data
    .filter(i => i.jenis === 'pemasukan')
    .reduce((a,b) =>
      a + Number(b.jumlah), 0);

  const pengeluaran = data
    .filter(i => i.jenis === 'pengeluaran')
    .reduce((a,b) =>
      a + Number(b.jumlah), 0);

  const saldo =
    pemasukan - pengeluaran;

  document.getElementById(
    'totalPemasukan'
  ).innerText =
    'Rp ' +
    pemasukan.toLocaleString('id-ID');

  document.getElementById(
    'totalPengeluaran'
  ).innerText =
    'Rp ' +
    pengeluaran.toLocaleString('id-ID');

  document.getElementById(
    'saldo'
  ).innerText =
    'Rp ' +
    saldo.toLocaleString('id-ID');
}