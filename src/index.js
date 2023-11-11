import axios from "axios";
import Notiflix from 'notiflix';
import {fetchCatByBreed} from "./cat-api.js";
import{fetchBreeds} from "./cat-api.js"

axios.defaults.headers.common["x-api-key"] = "live_O2YO54HSxb2Kak0cisjE6hbLFVXvAG8YjlBxcImC0eL6mxP8jZuGhZJ6kOKYX7xh";

const error = document.querySelector('.error');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const breedSelector = document.querySelector('.breed-select');

fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
   .then(breeds => {
      hideLoader();
      breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelector.appendChild(option);
        });
    })
    .catch(error => {
      hideLoader();
      showError('Error fetching cat breeds' + error.message);
    });

    const showLoader = () => {
        loader.style.display = 'block';
        breedSelector.style.display = 'none';
        catInfo.style.display = 'none';
        error.style.display = 'none';
      };
      
      const hideLoader = () => {
        loader.style.display = 'none';
        breedSelector.style.display = 'block';
        catInfo.style.display = 'block';
        error.style.display = 'none';
      };
      
      const showError = (message) => {
      error.textContent = message;
      error.style.display = 'block';
      };

      showLoader();
       breedSelector.addEventListener('change', () => {
          const selectedBreedId = breedSelector.value;
            if (selectedBreedId) {
            showLoader();
            fetchCatByBreed(selectedBreedId)
              .then(response => {
                hideLoader();
                error.style.display = 'none';
                const cat = response[0];
              
          catInfo.innerHTML = `
          <div class="cat-info-container">
          <div class="cat-photo-container">
          <img class="cat-photo" src="${cat.url}" alt="cat" style="width: 400px;">
          </div>
          <div class="cat-details">
          <h2>${cat.breeds[0].name}</h2>
          <p>Description: ${cat.breeds[0].description}</p>
          <p>Temperament: ${cat.breeds[0].temperament}</p>
          </div>
          </div>
          `;
      }) .catch(error => {
        hideLoader();
        showError("Error: " + error.message);
      });
  }
});
      