document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
      MENÚ MÓVIL (Bootstrap lo maneja, pero esto cubre
        el cierre automático al hacer clic en un enlace)
     ---------------------------------------------------------- */
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      /* Cierra el menú hamburguesa en móvil al elegir un enlace */
      var navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    });
  });

  /* ----------------------------------------------------------
      ENLACE ACTIVO EN LA NAVEGACIÓN
        Marca el enlace que corresponde a la página actual
     ---------------------------------------------------------- */
  var paginaActual = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === paginaActual) {
      link.classList.add('activo');
    }
  });

  /* ----------------------------------------------------------
     CAMBIO DE IDIOMA — ES / EN
     ---------------------------------------------------------- */
  var btnIdioma = document.getElementById('btn-idioma');

  if (btnIdioma) {
    btnIdioma.addEventListener('click', function () {
      var esIngles = document.body.classList.toggle('english');
      btnIdioma.textContent = esIngles ? 'ES' : 'EN';
    });
  }

  /* ----------------------------------------------------------
      ALERTA BOOTSTRAP — cierre automático
     ---------------------------------------------------------- */
  var alertas = document.querySelectorAll('.alert-dismissible');

  alertas.forEach(function (alerta) {
    setTimeout(function () {
      var btnCerrar = alerta.querySelector('.btn-close');
      if (btnCerrar) btnCerrar.click();
    }, 5000);
  });

});


/* ============================================================
   CARRUSEL PROPIO
   ============================================================ */


var carousels = {};

/**
 * moveCarousel — Avanza o retrocede una diapositiva.
 * @param {string} id  - ID del carrusel (ej: 'car-fotos')
 * @param {number} dir - Dirección: 1 = siguiente, -1 = anterior
 */
function moveCarousel(id, dir) {

  var car = document.getElementById(id);
  if (!car) return;

  var total = parseInt(car.getAttribute('data-total'), 10);

  if (carousels[id] === undefined) carousels[id] = 0;

  carousels[id] = (carousels[id] + dir + total) % total;

  var track = car.querySelector('.carousel__track');
  if (track) {
    track.style.transform = 'translateX(-' + (carousels[id] * 100) + '%)';
  }


  var counter = document.getElementById(id + '-count');
  if (counter) {
    counter.textContent = (carousels[id] + 1) + ' / ' + total;
  }
}
