// Menu
let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
// Define una función para animar los círculos
function animateCircles() {
  let options = {
    startAngle: -1.55,
    size: 150,
    value: 0.95,
    fill: {gradient: ['#05A8BF', '#33E6FF']}
  }
  
  $(".circle .bar").circleProgress(options).on('circle-animation-progress', function(event, progress, stepValue){
    $(this).parent().find("span").text(String(stepValue.toFixed(2).substr(2)) + "%");
  });
  
  $(".js .bar").circleProgress({
    value: 0.90
  });
  
  $(".node .bar").circleProgress({
    value: 0.92
  });
  
  $(".react .bar").circleProgress({
    value: 0.89
  });
}

// Define una función para comprobar si el elemento está en la pantalla

$.fn.isOnScreen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

// Llama a la función animateCircles cuando los círculos están en la pantalla

$(window).on("scroll", function() {
  if ($(".circle").isOnScreen() && !$(".circle .bar").hasClass("animated")) {
    animateCircles();
    $(".circle .bar").addClass("animated");
  }
});

// Decargar archivo (lo hago acá para probar un poco más js)

function descargarArchivo() {
  var link = document.createElement('a');
  link.setAttribute('href', '/descargas/CV.pdf');
  link.setAttribute('download', 'CV.pdf');
  link.click();
}

// Boton de enviar formulario

const formulario = document.querySelector('#contacto form');
const botonSubmit = formulario.querySelector('button[type="submit"]');

formulario.addEventListener('submit', function (event) {
  event.preventDefault();

  // Mostrar texto "enviando" en el botón submit
  botonSubmit.innerText = 'Enviando...';

  fetch(formulario.action, {
    method: 'POST',
    body: new FormData(formulario),
  })
    .then(response => {
      // Mostrar mensaje de éxito en el botón submit
      botonSubmit.innerText = 'Enviado';
      setTimeout(() => {
        botonSubmit.innerText = 'Enviar';
        formulario.reset(); // Limpiar el formulario después de enviar
      }, 3000);
    })
    .catch(error => {
      console.error('Error al enviar el formulario', error);
      // Mostrar mensaje de error en el botón submit
      botonSubmit.innerText = 'Error';
      setTimeout(() => {
        botonSubmit.innerText = 'Enviar';
      }, 3000);
    });
});
