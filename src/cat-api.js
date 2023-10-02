
import axios from 'axios';

export default class NewsApiService {
    constructor () {
        this.inputValues = "";
        this.page = 1;
    }
    requestToServer() {
        
        const API_Key = "39759844-290e4bcc18caed67d7b5a281b";
        const BASE_URL = "https://pixabay.com/api/";
        const searchParams = new URLSearchParams({
          image_type: "photo",
          orientation: "horizontal",
          safesearch: true,
          per_page: 40
          
        });
        
           return   axios (`${BASE_URL}?key=${API_Key}&q=${this.inputValues}&page=${this.page}&${searchParams.toString()}`)
              .then(response => {
             
              return response
              })
              .then(data => {
                return data.data
              
              }) 
  
}
incrementPage() {
    this.page += 1;
}
get query () {
    return  this.inputValues;
}
set query(newQuery) {
    this.inputValues = newQuery;
}

}





// export default class NewsApiService {
//     constructor () {
//         this.inputValues = "";
//         this.page = 1;
//         this.length = 40;
//     }
//     requestToServer() {
        
//         const API_Key = "39759844-290e4bcc18caed67d7b5a281b";
//         const BASE_URL = "https://pixabay.com/api/";
//         const searchParams = new URLSearchParams({
//           image_type: "photo",
//           orientation: "horizontal",
//           safesearch: true,
//           per_page: 40
          
//         });
   
//      return fetch (`${BASE_URL}?key=${API_Key}&q=${this.inputValues}&page=${this.page}&${searchParams.toString()}`)
//        .then(response => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
     
     
// }
// incrementPage() {
//     this.page += 1;
// }
// get query () {
//     return  this.inputValues;
// }
// set query(newQuery) {
//     this.inputValues = newQuery;
// }

// }
