const render = function () {
    const bookTemplates = {
    books: Handlebars.compile(
    document.querySelector('#template-book').innerHTML),
}
for (const book of dataSource.books) {

    book.ratingBgc = determineRatingBgc(book.rating);
    book.ratingWidth = book.rating * 10;

    const generatedHTML = bookTemplates.books(book);

    const domElement = utils.createDOMFromHTML(generatedHTML);

    const bookContainer = document.querySelector('.books-list');

    bookContainer.appendChild(domElement);

}
}

const favouriteBooks = [];

const initActions = function () {
const books = document.querySelector('.books-list');

books.addEventListener('dblclick', function (event) {
    if (event.target.offsetParent.classList.contains('book__image')) {
    event.preventDefault();
    const bookId = event.target.offsetParent.getAttribute('data-id');
    if (!favouriteBooks.includes(bookId)) {
        event.target.offsetParent.classList.add('favorite');
        favouriteBooks.push(bookId);
    } else {
        event.target.offsetParent.classList.remove('favorite');
        favouriteBooks.splice(favouriteBooks.indexOf(bookId), 1);
    }
}
});

form.addEventListener('click', function (event) {
    if (
        event.target.tagName == 'INPUT' &&
        event.target.type == 'checkbox' &&
        event.target.name == 'filter'
    ) {
        if (event.target.checked) {
            filters.push(event.target.value);
        } else {
            filters.splice(filters.indexOf(event.target.value), 1);
        }
    }
    filterBooks();
    const inputs = document.querySelectorAll('.filters input');
    for (let input of inputs) {
        input.addEventListener('change', filterBooks);
    }
});
}

const filters = [];

const form = document.querySelector('.filters');

const filterBooks = function () {
for (const book of dataSource.books) {
    let shouldBeHidden = false;
    for (const filter of filters) {
        if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
        }
    }
    if (shouldBeHidden) {
        document.querySelector(`[data-id="${book.id}"]`).classList.add('hidden');
    } else {
        document.querySelector(`[data-id="${book.id}"]`).classList.remove('hidden');
    }
}
}

const determineRatingBgc = function (rating) {

    let ratingBgc = '';

  if (rating < 6) {
  ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
  } else if (rating > 6 && rating <= 8) {
  ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
  } else if (rating > 8 && rating <= 9) {
  ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
  } else if (rating > 9) {
  ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
  }
  return ratingBgc;
}

render();
initActions();
determineRatingBgc();
