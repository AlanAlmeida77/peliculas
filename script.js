// Obtener referencias a los elementos del formulario
const form = document.getElementById("review-form");
const movieTitleInput = document.getElementById("movie-title");
const movieImageInput = document.getElementById("movie-image");
const movieRatingInput = document.getElementById("movie-rating");
const movieReviewInput = document.getElementById("movie-review");
const reviewsContainer = document.getElementById("reviews-container");
const reviewDetailsContainer = document.getElementById("review-details-container");
const reviewDetails = document.getElementById("review-details");
const closeDetailsButton = document.getElementById("close-details-button");

// Manejar el envío del formulario
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores de los campos del formulario
  const title = movieTitleInput.value;
  const image = movieImageInput.value;
  const rating = parseFloat(movieRatingInput.value);
  const review = movieReviewInput.value;

  // Limpiar los campos del formulario
  movieTitleInput.value = "";
  movieImageInput.value = "";
  movieRatingInput.value = "";
  movieReviewInput.value = "";

  // Crear el elemento de la reseña
  const reviewElement = document.createElement("div");
  reviewElement.classList.add("review");

  // Generar un ID único para la reseña
  const reviewId = generateReviewId();

  // Crear el contenido de la reseña
  reviewElement.innerHTML = `
    <img src="${image}" alt="${title}" data-review-id="${reviewId}">
    <h2>${title}</h2>
    <div class="rating">${getStarRating(rating)}</div>
    <p>${review}</p>
    <button class="delete-button">Eliminar</button>
  `;

  // Agregar el ID de la reseña al elemento de la reseña como un atributo de datos
  reviewElement.dataset.id = reviewId;

  // Agregar la reseña al contenedor de reseñas
  reviewsContainer.appendChild(reviewElement);

  // Guardar la nueva reseña en el localStorage
  const newReview = {
    id: reviewId,
    title: title,
    image: image,
    rating: rating,
    review: review
  };
  saveReviewToLocalStorage(newReview);

  // Obtener referencias a los botones de eliminación
  const deleteButtons = document.querySelectorAll(".delete-button");

  // Agregar el evento de click a cada botón de eliminación
  deleteButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      // Eliminar la reseña del DOM
      const review = button.parentNode;
      review.remove();

      // Eliminar la reseña del localStorage
      const reviewId = review.dataset.id;
      deleteReviewFromLocalStorage(reviewId);
    });
  });

  // Agregar el evento de click a la imagen de la reseña
  const reviewImages = document.querySelectorAll(".review img");
  reviewImages.forEach(function(image) {
    image.addEventListener("click", function() {
      const reviewId = image.dataset.reviewId;
      const review = findReviewById(reviewId);
      if (review) {
        showReviewDetails(review);
      }
    });
  });
});

// Función para generar un ID único para la reseña
function generateReviewId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para guardar las reseñas en el localStorage
function saveReviewsToLocalStorage(reviews) {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

// Función para obtener las reseñas del localStorage
function getReviewsFromLocalStorage() {
  const reviews = localStorage.getItem("reviews");
  return reviews ? JSON.parse(reviews) : [];
}

// Función para guardar una reseña en el localStorage
function saveReviewToLocalStorage(review) {
  const reviews = getReviewsFromLocalStorage();
  reviews.push(review);
  saveReviewsToLocalStorage(reviews);
}

// Función para eliminar una reseña del localStorage
function deleteReviewFromLocalStorage(id) {
  const reviews = getReviewsFromLocalStorage();

  // Filtrar la reseña a eliminar por su id
  const updatedReviews = reviews.filter(function(review) {
    return review.id !== id;
  });

  // Guardar las reseñas actualizadas en el localStorage
  saveReviewsToLocalStorage(updatedReviews);
}

// Función para obtener la representación en estrellas de una puntuación
function getStarRating(rating) {
  const roundedRating = Math.round(rating);
  const starHTML = '<i class="fas fa-star"></i>';
  const emptyStarHTML = '<i class="far fa-star"></i>';

  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars += starHTML;
    } else {
      stars += emptyStarHTML;
    }
  }

  return stars;
}

// Función para encontrar una reseña por su ID
function findReviewById(id) {
  const reviews = getReviewsFromLocalStorage();
  return reviews.find(function(review) {
    return review.id === id;
  });
}

// Función para mostrar los detalles de una reseña
function showReviewDetails(review) {
  reviewDetails.innerHTML = `
    <h2>${review.title}</h2>
    <img src="${review.image}" alt="${review.title}">
    <div class="rating">${getStarRating(review.rating)}</div>
    <p>${review.review}</p>
  `;

  reviewDetailsContainer.classList.add("show");
}

// Función para cerrar los detalles de una reseña
function closeReviewDetails() {
  reviewDetailsContainer.classList.remove("show");
}

// Cargar las reseñas almacenadas en el localStorage al cargar la página
window.addEventListener("DOMContentLoaded", function() {
  const reviews = getReviewsFromLocalStorage();

  reviews.forEach(function(review) {
    // Crear el elemento de la reseña
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");

    // Crear el contenido de la reseña
    reviewElement.innerHTML = `
      <img src="${review.image}" alt="${review.title}" data-review-id="${review.id}">
      <h2>${review.title}</h2>
      <div class="rating">${getStarRating(review.rating)}</div>
      <p>${review.review}</p>
      <button class="delete-button">Eliminar</button>
    `;

    // Agregar el ID de la reseña al elemento de la reseña como un atributo de datos
    reviewElement.dataset.id = review.id;

    // Agregar la reseña al contenedor de reseñas
    reviewsContainer.appendChild(reviewElement);
  });

  // Obtener referencias a los botones de eliminación
  const deleteButtons = document.querySelectorAll(".delete-button");

  // Agregar el evento de click a cada botón de eliminación
  deleteButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      // Eliminar la reseña del DOM
      const review = button.parentNode;
      review.remove();

      // Eliminar la reseña del localStorage
      const reviewId = review.dataset.id;
      deleteReviewFromLocalStorage(reviewId);
    });
  });

  // Agregar el evento de click a la imagen de la reseña
  const reviewImages = document.querySelectorAll(".review img");
  reviewImages.forEach(function(image) {
    image.addEventListener("click", function() {
      const reviewId = image.dataset.reviewId;
      const review = findReviewById(reviewId);
      if (review) {
        showReviewDetails(review);
      }
    });
  });

  // Agregar el evento de click al botón de cerrar detalles
  closeDetailsButton.addEventListener("click", function() {
    closeReviewDetails();
  });
});