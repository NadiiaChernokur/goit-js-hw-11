import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiService from "./cat-api"

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more")



form.addEventListener("submit",  onFormSubmit)
loadMore.addEventListener("click", toloadMore); 
form.addEventListener("change",  cleanMarkup)

let length = 40;
const newsApiService = new NewsApiService();




//   По результатам запиту на сервер показуємо картинки на сторінці
    async function onFormSubmit(event) {
       
        event.preventDefault();
        newsApiService.query = event.currentTarget.elements.searchQuery.value;
        
        try {
            const fetch = await newsApiService.requestToServer();
            const fetchResalt = await createMarkup(fetch);
            newsApiService.incrementPage();
             return fetchResalt;
           
        } catch {
            console.error()
        }
        };
    
// Кнопка для завантаження 40+ картинок
   
    async function toloadMore() {
        try {
            const toFetchNewPhotos = await newsApiService.requestToServer();
            const newPhotos = await createMarkup(toFetchNewPhotos);
           
                newsApiService.incrementPage();
            
                length += 40;
                if(length >= toFetchNewPhotos.totalHits) {
                    loadMore.setAttribute("hidden", "")
                    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                  
             }
                Notiflix.Notify.success(`Hooray! We ${length} images.`);
                
             return newPhotos
    } catch {
        console.error()
        }
    };

// Функція зміни запиту
      function  cleanMarkup(){
        loadMore.setAttribute("hidden", "")
        gallery.innerHTML = "";

      }


// Створюємо розмітку!
  function createMarkup(objects) {
    const oneCopys = objects.hits;
    
    if (oneCopys.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
    }
    loadMore.removeAttribute("hidden", "")
        oneCopys.map(({webformatURL, tags, likes, views, comments, downloads,}) => {
            gallery.insertAdjacentHTML("beforeEnd", `  <a> <div class="photo-card">
           
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
          </div>  </a>`)
        })
        
    };

    
   