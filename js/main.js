'use strict';

// lógica para imprimir título e imagen

var button = document.querySelector('#button');
var input = document.querySelector('#input');
var list = document.querySelector('#list');

// función para hacer búsqueda
function requestFilms() {
  // borramos el contenido al hacer nueva búsqueda
  list.innerHTML = '';
  // llamamos a la API con nuestra búsqueda
  var userSearch = input.value;
  fetch('http://api.tvmaze.com/search/people?q=' + userSearch)
    .then(function(response){
      return response.json();
    })

    // Recogemos la búsqueda
    .then(function(json){
      var searchResult = json;
      console.log(searchResult);
      if (searchResult.length === 0) {
        alert('Introduce una búsqueda válida (y chachi)');
      } else {
        // bucle para entrar en el array
        var resultLength = searchResult.length;
        var numberOfSearchs = document.querySelector('.number-of-searchs');
        numberOfSearchs.innerHTML = 'Hay ' + resultLength + ' resultados para la búsqueda ' + userSearch;
        for (var i = 0; i < searchResult.length; i++) {

          var newItem = document.createElement('li');
          newItem.classList.add('list__item');
          // newItem.setAttribute('id', searchResult[i].show.id); // añado al li el id de backend
          newItem.addEventListener('click', favorite);

          var newTitle = document.createElement('h2');
          newTitle.classList.add('list__item-title');
          var newName = document.createTextNode(searchResult[i].person.name);

          var newIMG = document.createElement('img');
          var newURL = searchResult[i].person.image;

          // logica para imprimir las imágenes
          if (newURL !== null) {
            newIMG.setAttribute('src', newURL.medium);
          } else if (newURL === null) {
            newIMG.setAttribute('src', 'https://via.placeholder.com/210x295/cccccc/666666/?text=NO PIC :)');
          }

          // lógica para imprimir la lista en html
          newTitle.appendChild(newName);
          newItem.appendChild(newTitle);
          newItem.appendChild(newIMG);
          list.appendChild(newItem);
        }
      }
    });
}

// función para definir la lógica de los favoritos
function favorite(event) {
  var myFilm = event.currentTarget;
  myFilm.classList.toggle('list__item--fav');

  console.log(myFilm.querySelector('h2').innerHTML);
}

// prevenir que el formulario se resetee si le doy a intro

function handleFormSubmit(event) {
  event.preventDefault();
  console.log('hola');
}

button.addEventListener('click', requestFilms);
button.addEventListener('click', handleFormSubmit);
