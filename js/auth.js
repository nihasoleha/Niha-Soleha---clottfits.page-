/* Akses halaman berdasarkan peran yang dipilih saat login. */
(() => {
  const page = document.body.dataset.page;
  const role = localStorage.getItem("clottfitsRole");

  if (page === "admin" && role !== "admin") {
    window.location.replace("login.html?role=admin");
    return;
  }

  if (page === "store" && !role) {
    window.location.replace("login.html");
    return;
  }

  if (page === "admin" && role === "user") {
    window.location.replace("index.html");
  }
})();
