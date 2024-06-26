$(document).ready(function() {
  // MODAL
  var modalText = {
    discover: {
      title: 'Aplicación de Tareas',
      tag: 'Lleva un control de tus tareas diarias.',
      detail:
        'Aplicación para asignar tareas en general, trabajo o en casa.',
      link: 'https://michaelaplicacion.github.io/'
    },
    ordering: {
      title: 'Calculadora Online',
      tag: 'Útil plataforma matemática..',
      detail:
        'Está aplicación de calculadora tiene un peso ligero dentro de la web, perfecta para realizar tus tareas matemáticas cuando necesites una calcualdora.',
      link: 'https://michael23499.github.io/'
    },
    newrelic: {
      title: 'NewRelic.com',
      tag: 'Snake Game.',
      detail:
        'Juego Clásico SNAKE GAME.',
      link: 'https://gamesnake1.github.io/'
    },
    walker: {
      title: 'WalkerTracker',
      tag: 'MÉTRICAS DE RENDIMIENTO.',
      detail:
        'Walker Tracker ofrece gestión de objetivos, seguimiento del estado físico y competiciones en equipo a empresas para uso interno. Un sitio complementario de Ruby on Rails y Javascript para la aplicación Walker Tracker. Cuenta con métricas visuales y un sistema de progresión gamificado..'
    },
    mystand: {
      title: 'MyStand',
      tag: 'CARIDAD FINANCIADA POR MULTITUD.',
      detail:
        'MyStand es un sitio web de intercambio de medios y financiación colectiva, en el que usted puede donar acciones en lugar de dinero de su bolsillo. Aplicación de una sola página creada con Node.js en Sails y Angular 2.0. Incluye intercambio de redes sociales y financiación colectiva a gran escala.'
    },
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});