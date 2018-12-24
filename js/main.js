---
layout: null
---

function mobileMenu() {
  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated slideInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })
}

$(document).ready(function () {
  mobileMenu();
})
