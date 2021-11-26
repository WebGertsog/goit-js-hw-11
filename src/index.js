import './sass/main.scss';
import {axiosGet} from './js/pixabay_api';
import {Notify} from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let lightbox = new SimpleLightbox('.gallery a');
let pageNum = 1;
let totalHits = 0;
let perPage = 100;


refs.loadMoreBtn.classList.add('is-hidden');
refs.searchForm.addEventListener('submit', pushTheButton);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function pushTheButton(e){
  e.preventDefault();
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.gallery.innerHTML = '';

  const value = refs.input.value;

  if (value === '' || value === ' ') {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return
  }

  const dataResult = await axiosGet(refs.input.value, pageNum, perPage);
  totalHits = dataResult.data.totalHits;
  
  if (dataResult.data.hits.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  Notify.info(`Hooray! We found ${totalHits} images.`);

  renderMarkup(dataResult);
  refs.loadMoreBtn.classList.remove('is-hidden');
};

function renderMarkup(e) {
  lightbox.refresh();
  return refs.gallery.insertAdjacentHTML('beforeend', createMarkup(e.data.hits));
  
  
}

function createMarkup(e){
  return e.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `
    <div class="photo-card">
    <a class="photo-card__link" href="${largeImageURL}">
    <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span${views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span>${comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span>${downloads}</span>
      </p>
    </div>
    </a>
  </div>
        `
    )
    .join('');
};

async function onLoadMore(){
  const dataResult = await axiosGet(refs.input.value, pageNum, perPage);
  renderMarkup(dataResult);
  pageNum += 1;
 
  const totalPage = totalHits / perPage;
  console.log(pageNum);

  if (pageNum > totalPage) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }
    
 
};