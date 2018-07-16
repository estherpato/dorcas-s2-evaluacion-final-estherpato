'use strict';

// lógica para imprimir título e imagen

var button = document.querySelector('#button');
var input = document.querySelector('#input');
var list = document.querySelector('#list');

var userSearch;
var searchResult;
var newItem;
var newTitle;
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
  fetch('http://api.tvmaze.com/search/people?q=' + userSearch)
    .then(function(response){
      return response.json();
    })

    // Recogemos la búsqueda
    .then(function(json){
      searchResult = json;
      console.log(searchResult);
      if (searchResult.length === 0) {
        alert('Introduce una búsqueda válida (y chachi)');
      } else {
        // bucle para entrar en el array
        var resultLength = searchResult.length;
        console.log(resultLength);
        var paragraph = document.querySelector('.searchs');
        paragraph.innerHTML = 'Hay ' + resultLength + ' resultados para la búsqueda ' + userSearch;
        for (var i = 0; i < searchResult.length; i++) {

          newItem = document.createElement('li');
          newItem.classList.add('list__item');
          // newItem.setAttribute('id', searchResult[i].show.id); // añado al li el id de backend
          newItem.addEventListener('click', favorite);

          newTitle = document.createElement('h2');
          newTitle.classList.add('list__item-title');
          newName = document.createTextNode(searchResult[i].person.name);

          newIMG = document.createElement('img');
          newURL = searchResult[i].person.image;

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
  myFilm = event.currentTarget;
  // var myFilmID = myFilm.id; // meter el id en un objeto y el objeto en un array
  if (myFilm.classList.contains('list__item--fav')) {
    myFilm.classList.remove('list__item--fav');
  } else {
    myFilm.classList.add('list__item--fav');
  }

console.log(myFilm.querySelector('h2').innerHTML);

}

button.addEventListener('click', requestFilms);

// local storage
