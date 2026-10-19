// ===== daftar.js : khusus halaman daftar.html =====

var bahasa = [
  ["JavaScript", "🟨"], ["Python", "🐍"], ["Java", "☕"], ["PHP", "🐘"],
  ["C++", "⚙️"], ["Dart / Flutter", "🎯"], ["Go", "🐹"], ["Kotlin", "🤖"]
];

var form = document.getElementById("regForm");
var result = document.getElementById("result");

// Buat pilihan bahasa pemrograman (checkbox)
document.getElementById("langs").innerHTML = bahasa.map(function (b) {
  return '<label class="opt"><input type="checkbox" name="bahasa" value="' + b[0] + '"><span>' + b[1] + " " + b[0] + "</span></label>";
}).join("");

// NIK dan No. HP hanya boleh angka
["nik", "hp"].forEach(function (id) {
  document.getElementById(id).addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });
});

// Tandai / hilangkan pesan error pada field
function setErr(id, salah) {
  document.getElementById(id).classList.toggle("err", salah);
  return salah;
}

// Validasi semua isian. Mengembalikan true jika semua valid.
function validasi() {
  var nik = form.nik.value.trim();
  var nama = form.nama.value.trim();
  var hp = form.hp.value.trim();
  var alamat = form.alamat.value.trim();
  var jk = form.querySelector('input[name="jk"]:checked');
  var bhs = form.querySelectorAll('input[name="bahasa"]:checked');

  var adaSalah = false;
  adaSalah = setErr("f-nik", !/^\d{16}$/.test(nik)) || adaSalah;
  adaSalah = setErr("f-nama", nama.length < 3) || adaSalah;
  adaSalah = setErr("f-jk", !jk) || adaSalah;
  adaSalah = setErr("f-hp", !/^\d{10,14}$/.test(hp)) || adaSalah;
  adaSalah = setErr("f-alamat", alamat.length < 10) || adaSalah;
  adaSalah = setErr("f-bahasa", bhs.length === 0) || adaSalah;
  return !adaSalah;
}

// Cegah XSS saat menampilkan data
function esc(s) {
  return s.replace(/[&<>"']/g, function (c) {
    return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c];
  });
}

// Tampilkan hasil sesuai isian form
function tampilkanHasil() {
  var bhs = Array.prototype.map.call(
    form.querySelectorAll('input[name="bahasa"]:checked'),
    function (c) { return c.value; }
  );

  document.getElementById("r-nik").textContent = form.nik.value.trim();
  document.getElementById("r-nama").textContent = form.nama.value.trim();
  document.getElementById("r-jk").textContent = form.querySelector('input[name="jk"]:checked').value;
  document.getElementById("r-hp").textContent = form.hp.value.trim();
  document.getElementById("r-alamat").textContent = form.alamat.value.trim();
  document.getElementById("r-bahasa").innerHTML = bhs.map(function (b) {
    return '<span class="badge">' + esc(b) + "</span>";
  }).join("");

  result.classList.add("show");
  result.scrollIntoView({behavior: "smooth", block: "center"});
}

// Saat tombol Simpan ditekan
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validasi()) {
    var pertama = document.querySelector(".field.err");
    if (pertama) pertama.scrollIntoView({behavior: "smooth", block: "center"});
    return;
  }

  // Dialog konfirmasi: OK = "Ya", Cancel = "Tidak"
  var yakin = confirm("Apakah Anda sudah yakin untuk menyimpan?");
  if (yakin) {
    tampilkanHasil();
  }
});

function resetForm() {
  form.reset();
  document.querySelectorAll(".field.err").forEach(function (f) { f.classList.remove("err"); });
}

document.getElementById("btnReset").addEventListener("click", function () {
  resetForm();
  result.classList.remove("show");
});

document.getElementById("btnBaru").addEventListener("click", function () {
  resetForm();
  result.classList.remove("show");
  form.scrollIntoView({behavior: "smooth", block: "start"});
});
