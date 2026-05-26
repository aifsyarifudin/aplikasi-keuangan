const SHEET_ID =
'1R9LSyCbUziowb52t5BVLUPiUugYn1IhyAl48ZQLhyFw';

const API_KEY =
'AIzaSyDZkp3tY5FtNVxigkEroedHVpgLhp1KwEI';

const RANGE =
'Keuangan!A:D';

const RANGE_KAS =
'Kas!A:D';

const READ_URL =
`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

const READ_KAS_URL =
`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE_KAS}?key=${API_KEY}`;

const WRITE_URL =
'https://script.google.com/macros/s/AKfycbxeGcMlt9F5XRGgb4b-UxQeJznAd0H_mFw1QJWPsuZzJFpxoehOeUUgP-kV5aHIDNX93w/exec';

let chart = null;
let selectedIndex = null;
let saldoKasGlobal = 0;