'use strict';

// lógica para imprimir título e imagen

var windowBody = document.querySelector('body');
var button = document.querySelector('#button');
var input = document.querySelector('#input');
var list = document.querySelector('#list')
var userSearch;
var searchResult;
var newItem;
var newName;
var newIMG;
var newURL;
var myFilm;

// función para hacer búsqueda
function requestFilms() {
  // borramos el contenido al hacer nueva búsqueda
  list.innerHTML = '';

  // llamamos a la API con nuestra búsqueda
  userSearch = input.value;
  fetch('http://api.tvmaze.com/search/shows?q=' + userSearch)
    .then(function(response){
      return response.json();
    })

  // Recogemos la búsqueda
    .then(function(json){
      searchResult = json;

      // bucle para entrar en el array
      for (var i = 0; i < searchResult.length; i++) {
        newItem = document.createElement('li');
        newItem.classList.add('list');
        newItem.addEventListener('click', favorite);
        newName = document.createTextNode(searchResult[i].show.name);
        newIMG = document.createElement('img');
        newURL = searchResult[i].show.image;

        // logica para imprimir las imágenes
        if (newURL !== null) {
          newIMG.setAttribute('src', newURL.medium);
        } else if (newURL === null) {
          newIMG.setAttribute('src', 'https://via.placeholder.com/210x295/cccccc/666666/?text=NOPE :)');
        }

        // lógica para imprimir la lista en html
        newItem.appendChild(newName);
        newItem.appendChild(newIMG);
        list.appendChild(newItem);
      }
    });
}

function favorite(event) {
  var myFilm = event.currentTarget;
  myFilm.classList.add('favorite--active');
}

button.addEventListener('click', requestFilms);
