'use strict';

var button = document.querySelector('#button');
var input = document.querySelector('#input');


function loquesea() {
  console.log('soy el botón y funciono');
}

button.addEventListener('click', loquesea);
