(function() {
  'use strict';

  const renderMovies = function(movies) {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({ delay: 50 }).text(movie.Title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  let userInput = "";
  let responseData;
  let imageID;
  const button = document.querySelector("button");
  const search = document.getElementById("search");

  button.addEventListener('click', function(e) {

    e.preventDefault();
    userInput = search.value;
    console.log(userInput);

    if (userInput !== "") {

      fetch('http://www.omdbapi.com/?i=tt3896198&apikey=4e26a6e0&s=' + userInput)
        .then(function(response) {
          response.json()
          .then(function(data){
            console.log(data);
            renderMovies(data.Search);
          })
        })
        .catch(function(err) {
          console.log(new Error(err))
        });

    } else {
      console.log("Wow")
      document.forms.searchForm.searchInput.placeholder = "Input can't be blank";
    }
  });
})();
