function descargarArchivo(ruta, nombreArchivo) {
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = ruta;
    enlaceDescarga.download = nombreArchivo;
    enlaceDescarga.click();
    enlaceDescarga.remove();
  }

  const imagenDescarga1 = document.getElementById("imagen-descarga-1");
  imagenDescarga1.addEventListener("click", function () {
    descargarArchivo("Ciclo2/", "number_to_text.py");
  });

  const imagenDescarga2 = document.getElementById("imagen-descarga-2");
  imagenDescarga2.addEventListener("click", function () {
    descargarArchivo("Ciclo2/", "web_scrapping.py");
  });

  const imagenDescarga3 = document.getElementById("imagen-descarga-3");
  imagenDescarga3.addEventListener("click", function () {
    descargarArchivo("Ciclo2/", "phone_menu.py");
  });

  const imagenDescarga4 = document.getElementById("imagen-descarga-4");
  imagenDescarga4.addEventListener("click", function () {
    descargarArchivo("Ciclo2/", "movie_ranking.py");
  });

  const imagenDescarga5 = document.getElementById("imagen-descarga-5");
  imagenDescarga5.addEventListener("click", function () {
    descargarArchivo("Ciclo2/", "hangman_game.py");
  });
