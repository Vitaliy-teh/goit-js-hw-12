import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}" data-caption="${tags}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <span class="label">Likes</span>
          <span class="value">${likes}</span>
        </div>
        <div class="info-item">
          <span class="label">Views</span>
          <span class="value">${views}</span>
        </div>
        <div class="info-item">
          <span class="label">Comments</span>
          <span class="value">${comments}</span>
        </div>
        <div class="info-item">
          <span class="label">Downloads</span>
          <span class="value">${downloads}</span>
        </div>
      </div>
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
