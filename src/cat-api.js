export default { fetchBreeds, fetchCatByBreed };
const API_KEY =
  'api_key=live_EVpG5Pz1ZskxpI54IuyFnK1IDr8GvFahFSiuiBKFNcZ0f5efdhxKo7Gh4FlQbM1l';
const API_URL = 'https://api.thecatapi.com/v1/';
export function fetchBreeds(params) {
  return fetch(`${API_URL}breeds?${API_KEY}`).then(r => {
    return r.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${API_URL}images/search?${API_KEY}&breed_ids=${breedId}`).then(
    r => r.json()
  );
}
