// ===== gallery.js : khusus halaman index.html =====

// Data kegiatan. Untuk foto asli, isi properti "foto" dengan path gambar,
// contoh: foto: "images/bootcamp.jpg". Jika kosong, dipakai gradasi + emoji.
var kegiatan = [
  {judul:"Bootcamp Web Development", kat:"Bootcamp", tgl:"12 Jan 2026", emoji:"💻", warna:["#ff7a00","#111111"], foto:"", peserta:40, lokasi:"Lab Komputer 1",
   desk:"Pelatihan intensif 8 minggu membahas HTML, CSS, JavaScript hingga membangun website responsif secara mandiri."},
  {judul:"Workshop Python & Data Science", kat:"Workshop", tgl:"02 Feb 2026", emoji:"🐍", warna:["#ff9d00","#3d7a1f"], foto:"", peserta:35, lokasi:"Ruang Seminar",
   desk:"Peserta belajar dasar Python, pengolahan data dengan Pandas, dan visualisasi data sederhana."},
  {judul:"Hackathon 24 Jam", kat:"Kompetisi", tgl:"21 Mar 2026", emoji:"🏆", warna:["#111111","#ff6a00"], foto:"", peserta:60, lokasi:"Aula Utama",
   desk:"Tim-tim peserta berlomba membangun prototipe aplikasi dalam 24 jam, dinilai oleh juri dari industri."},
  {judul:"Mobile App dengan Flutter", kat:"Bootcamp", tgl:"15 Apr 2026", emoji:"📱", warna:["#7b1e1e","#ff9f1c"], foto:"", peserta:30, lokasi:"Lab Komputer 2",
   desk:"Membuat aplikasi Android dan iOS dari satu basis kode menggunakan Dart dan Flutter."},
  {judul:"Sesi Mentoring & Code Review", kat:"Workshop", tgl:"09 Mei 2026", emoji:"👨‍🏫", warna:["#2d1b36","#e85d04"], foto:"", peserta:25, lokasi:"Ruang Diskusi",
   desk:"Mentor membahas kode peserta satu per satu, memberikan masukan, serta tips praktik terbaik penulisan program."},
  {judul:"Demo Day & Wisuda Angkatan", kat:"Event", tgl:"28 Jun 2026", emoji:"🎓", warna:["#ff6a00","#1b1b1b"], foto:"", peserta:120, lokasi:"Auditorium",
   desk:"Peserta mempresentasikan proyek akhir di hadapan mitra industri dan menerima sertifikat kelulusan."}
];

var kategori = ["Semua", "Bootcamp", "Workshop", "Kompetisi", "Event"];

var grid = document.getElementById("grid");
var filters = document.getElementById("filters");

// Tampilkan kartu gallery sesuai kategori
function renderGrid(kat) {
  var daftar = kegiatan.filter(function (k) {
    return kat === "Semua" || k.kat === kat;
  });

  grid.innerHTML = daftar.map(function (k) {
    var gambar = k.foto ? '<img src="' + k.foto + '" alt="' + k.judul + '">' : "";
    return (
      '<article class="card">' +
        '<div class="photo" style="background:linear-gradient(135deg,' + k.warna[0] + ',' + k.warna[1] + ')">' +
          gambar +
          '<span class="tag">' + k.kat + '</span>' +
          '<span class="big">' + (k.foto ? "" : k.emoji) + '</span>' +
          '<span class="date">' + k.tgl + '</span>' +
        '</div>' +
        '<div class="body">' +
          '<h3>' + k.judul + '</h3>' +
          '<p>' + k.desk + '</p>' +
          '<div class="meta"><span>👥 ' + k.peserta + ' peserta</span><span>📍 ' + k.lokasi + '</span></div>' +
        '</div>' +
      '</article>'
    );
  }).join("");
}

// Tampilkan tombol filter
function renderFilters(aktif) {
  filters.innerHTML = kategori.map(function (c) {
    return '<button class="chip' + (c === aktif ? " active" : "") + '" data-kat="' + c + '">' + c + '</button>';
  }).join("");
}

filters.addEventListener("click", function (e) {
  var tombol = e.target.closest(".chip");
  if (!tombol) return;
  renderFilters(tombol.dataset.kat);
  renderGrid(tombol.dataset.kat);
});

// Jalankan saat halaman dibuka
renderFilters("Semua");
renderGrid("Semua");
