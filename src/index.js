import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
const loaderEl = document.querySelector('.loader');
let selectEl = document.querySelector('.breed-select');
const errorEl = document.querySelector('.error');
const divEl = document.querySelector('.cat-info');
loaderEl.hidden = false;
errorEl.hidden = true;
selectEl.hidden = true;
fetchBreeds().then(allCats).catch(onError).finally(isHidden);

selectEl.addEventListener('change', onSelectChange);

function allCats(cat) {
  cat.map(cats => {
    const markup = `
<option  value="${cats.id}">${cats.name}</option>
      `;
    selectEl.insertAdjacentHTML('afterbegin', markup);
  });
}

function onSelectChange(e) {
  const catId = e.target.value;
  loaderEl.hidden = false;
  fetchCatByBreed(catId).then(catSearch).catch(onError).finally(isHidden);
}

function catSearch(cat) {
  const { breeds, url } = cat[0];
  const { name, temperament, description } = breeds[0];
  divEl.innerHTML = `
<div class="img-div">
<img width='400' heigth='400' src="${url}" alt="${name}"></div>
  
<div class="text-div"><h2>${name}</h2>
<p>${description}</p>
<p><b>Temperament: </b>${temperament}</p></div>`;
}

function onError(err) {
  Notiflix.Notify.failure(errorEl.textContent);
}

function isHidden(finaly) {
  loaderEl.hidden = true;
  selectEl.hidden = false;
}
