import Notiflix from 'notiflix';
import axios from 'axios';

const q = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more")


const API_Key = "39759844-290e4bcc18caed67d7b5a281b";
const BASE_URL = "https://pixabay.com/api/";

q.addEventListener("submit", showPhotos)
loadMore.addEventListener("click", toloadMore); 
// gallery.addEventListener("click", toShowLagePhoto)


let page = 1;

// const searchParams = new URLSearchParams({
//     image_type: "photo",
//     orientation: "horizontal",
//     safesearch: true,
//     per_page: 40
    
//   });
 async function toFetch(event) {
    const inputValue = event.target.searchQuery.value;
    const API_Key = "39759844-290e4bcc18caed67d7b5a281b";
    const BASE_URL = "https://pixabay.com/api/";
    const params = {
    image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 40
}

 await axios.get(`${BASE_URL}?key=${API_Key}&q=${inputValue}&page=${page}`, {params})
  
  .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
         response.json();
        console.log(response.json())
        
      })
      .then(data => {
        createMarkup(data)
        page += 1
      })
      .catch(console.error())
    };


  // По результатам запиту на сервер показуємо картинки на сторінці
function showPhotos(e) {
    e.preventDefault();
    toFetch(e)
    
    };
    
 // Запит на сервер за першою партією картинок
// function toFetch(event) {

//    const inputValue = event.target.searchQuery.value;

//    return fetch (`${BASE_URL}?key=${API_Key}&q=${inputValue}&page=${page}&${searchParams.toString()}`)
//    .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
    
//   })
//   .then(data => {
//     createMarkup(data)
//     page += 1
//   })
//   .catch(console.error())
// };



// Кнопка для завантаження 40+ картинок

function toloadMore() {
    page += 1
    console.log( toFetch())
    toFetch()
};


// Створюємо розмітку!
 function createMarkup(objects) {
    const oneCopys = objects.hits;
    if (oneCopys.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
    }
    loadMore.removeAttribute("hidden", "")
        oneCopys.map(({webformatURL, tags, likes, views, comments, downloads}) => {
            gallery.insertAdjacentHTML("afterbegin", ` <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" height="200" width="350" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes </b>
                <b> ${likes}</b>
              </p>
              <p class="info-item">
                <b>Views</b>
                <b> ${views}</b>
              </p>
              <p class="info-item">
                <b>Comments </b>
                <b> ${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads </b>
                <b> ${downloads}</b>
              </p>
            </div>
          </div>`)
        })
    };


  
   