function renderChart(data) {

  const bulanMap = {

    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'Mei',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Agu',
    '09': 'Sep',
    '10': 'Okt',
    '11': 'Nov',
    '12': 'Des'
  };

  const totalPerBulan = {};

  data.forEach(item => {

    if(!item.tanggal) return;

    const tanggal =
      item.tanggal.toString();

    if(!tanggal.includes('-')) return;

    const bulan =
      tanggal.split('-')[1];

    if(!totalPerBulan[bulan]) {

      totalPerBulan[bulan] = {

        pemasukan: 0,
        pengeluaran: 0
      };
    }

    if(item.jenis === 'pemasukan') {

      totalPerBulan[bulan].pemasukan +=
        Number(item.jumlah);
    }

    if(item.jenis === 'pengeluaran') {

      totalPerBulan[bulan].pengeluaran +=
        Number(item.jumlah);
    }
  });

  const sortedBulan =
    Object.keys(totalPerBulan).sort();

  const labels =
    sortedBulan.map(
      b => bulanMap[b]
    );

  const pemasukanValues =
    sortedBulan.map(
      b => totalPerBulan[b].pemasukan
    );

  const pengeluaranValues =
    sortedBulan.map(
      b => totalPerBulan[b].pengeluaran
    );

  const ctx =
    document
      .getElementById('chartKeuangan')
      .getContext('2d');

  if(chart) {

    chart.destroy();
  }

  const gradientMasuk =
    ctx.createLinearGradient(0,0,0,300);

  gradientMasuk.addColorStop(
    0,
    'rgba(34,197,94,0.4)'
  );

  gradientMasuk.addColorStop(
    1,
    'rgba(34,197,94,0)'
  );

  const gradientKeluar =
    ctx.createLinearGradient(0,0,0,300);

  gradientKeluar.addColorStop(
    0,
    'rgba(239,68,68,0.4)'
  );

  gradientKeluar.addColorStop(
    1,
    'rgba(239,68,68,0)'
  );

  chart = new Chart(ctx, {

    type: 'line',

    data: {

      labels: labels,

      datasets: [

                  {

                    label: 'Pemasukan',

                    data: pemasukanValues,

                    tension: 0.4,

                    fill: true,

                    backgroundColor: gradientMasuk,

                    borderColor: '#22c55e',

                    borderWidth: 3,

                    pointRadius: 4,

                    pointHoverRadius: 7
                  },

                  {

                    label: 'Pengeluaran',

                    data: pengeluaranValues,

                    tension: 0.4,

                    fill: true,

                    backgroundColor: gradientKeluar,

                    borderColor: '#ef4444',

                    borderWidth: 3,

                    pointRadius: 4,

                    pointHoverRadius: 7
                  }
                ]
    },

    options: {

      responsive: true,

      plugins: {

        legend: {

          display: true
        }
      },

      scales: {

        y: {

          beginAtZero: true
        }
      }
    }
  });
}