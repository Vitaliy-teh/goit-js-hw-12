import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();

  query = form.elements.searchQuery.value.trim();
  page = 1;
  form.elements.searchQuery.value = '';
  clearGallery();
  hideLoadMoreButton();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'Sorry, no images match your search query.',
      });
      return;
    }

    createGallery(data.hits);

    if (totalHits > page * 15) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later.',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    smoothScroll();

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later.',
    });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery .gallery-item');
  if (galleryItem) {
    const { height: cardHeight } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
