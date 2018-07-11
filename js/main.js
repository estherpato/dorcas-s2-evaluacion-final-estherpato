'use strict';

var button = document.querySelector('#button');
var input = document.querySelector('#input');

function requestFilms() {
  var userSearch = input.value;

  fetch('http://api.tvmaze.com/search/shows?q=' + userSearch)
    .then(function(response){
      return response.json();
    })

    .then(function(json){
      var searchResult = json;
      // for (var i = 0; i < searchResult.length)
    });
}

button.addEventListener('click', requestFilms);
