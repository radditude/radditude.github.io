---
layout: null
---

function portfolioButton() {
  $('a.portfolio-button').click(function (e) {
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return 
    currentWidth = $('.panel-cover').width();
      if (currentWidth < 960) {
        $('.panel-cover').addClass('panel-cover--collapsed');
        $('.content-wrapper').addClass('animated slideInRight');
      } else {
        $('.panel-cover').css('max-width', currentWidth);
        $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {});
      }
  });
  
  if (window.location.hash && window.location.hash == '#portfolio') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }
}

function mobileMenu() {
  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated slideInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })
}



$(document).ready(function () {
  portfolioButton();
  mobileMenu();

  $('.navigation-wrapper .portfolio-button').click(function () {
    $('.navigation-wrapper').toggleClass('visible')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

})
