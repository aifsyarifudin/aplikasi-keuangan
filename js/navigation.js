function showPage(page) {

  // SEMBUNYIKAN PAGE
  document
    .getElementById('dashboardPage')
    .classList.add('hidden');

  document
    .getElementById('inputPage')
    .classList.add('hidden');

  document
    .getElementById('rekapPage')
    .classList.add('hidden');

  document
    .getElementById('kasPage')
    .classList.add('hidden');

  // RESET MENU ACTIVE
  document
    .getElementById('menuDashboard')
    .classList.remove(
      'bg-white',
      'text-blue-600',
      'font-bold'
    );

  document
    .getElementById('menuInput')
    .classList.remove(
      'bg-white',
      'text-blue-600',
      'font-bold'
    );

  document
    .getElementById('menuRekap')
    .classList.remove(
      'bg-white',
      'text-blue-600',
      'font-bold'
    );

  document
    .getElementById('menuKas')
    .classList.remove(
      'bg-white',
      'text-blue-600',
      'font-bold'
    );

  // DASHBOARD
  if(page === 'dashboard') {

    document
      .getElementById('dashboardPage')
      .classList.remove('hidden');

    document
      .getElementById('menuDashboard')
      .classList.add(
        'bg-white',
        'text-blue-600',
        'font-bold'
      );
  }

  // INPUT
  if(page === 'input') {

    document
      .getElementById('inputPage')
      .classList.remove('hidden');

    document
      .getElementById('menuInput')
      .classList.add(
        'bg-white',
        'text-blue-600',
        'font-bold'
      );
  }

  // REKAP
  if(page === 'rekap') {

    document
      .getElementById('rekapPage')
      .classList.remove('hidden');

    document
      .getElementById('menuRekap')
      .classList.add(
        'bg-white',
        'text-blue-600',
        'font-bold'
      );
  }

  // KAS
  if(page === 'kas') {

    document
      .getElementById('kasPage')
      .classList.remove('hidden');

    document
      .getElementById('menuKas')
      .classList.add(
        'bg-white',
        'text-blue-600',
        'font-bold'
      );
  }
}