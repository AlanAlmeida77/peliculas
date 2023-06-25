// Obtener el formulario de reseñas
const reviewForm = document.getElementById('review-form');

// Obtener el contenedor de reseñas
const reviewsContainer = document.getElementById('reviews-container');

// Obtener los datos de reseñas almacenados en el almacenamiento local
let reviewsData = JSON.parse(localStorage.getItem('reviewsData')) || [];

// Mostrar las reseñas existentes
if (reviewsData.length > 0) {
  reviewsData.forEach((reviewData) => {
    const reviewElement = createReviewElement(reviewData);
    reviewsContainer.appendChild(reviewElement);
  });
}

// Agregar evento de envío de formulario
reviewForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener los valores del formulario
  const title = document.getElementById('movie-title').value;
  const year = document.getElementById('movie-year').value;
  const director = document.getElementById('movie-director').value;
  const image = document.getElementById('movie-image').value;
  const rating = document.getElementById('movie-rating').value;
  const review = document.getElementById('movie-review').value;

  // Crear un objeto con los datos de la reseña
  const reviewData = {
    title,
    year,
    director,
    image,
    rating,
    review
  };

  // Agregar la reseña a la lista de reseñas
  reviewsData.push(reviewData);

  // Guardar los datos de reseñas en el almacenamiento local
  localStorage.setItem('reviewsData', JSON.stringify(reviewsData));

  // Crear el elemento de reseña y agregarlo al contenedor
  const reviewElement = createReviewElement(reviewData);
  reviewsContainer.appendChild(reviewElement);

  // Limpiar el formulario
  reviewForm.reset();
});

// Función para crear un elemento de reseña
function createReviewElement(reviewData) {
  const reviewElement = document.createElement('div');
  reviewElement.classList.add('review');

  const reviewContent = `
    <img src="${reviewData.image}" alt="Imagen de la película">
    <div class="review-details">
      <h2>${reviewData.title}</h2>
      <p>Año: ${reviewData.year}</p>
      <p>Director: ${reviewData.director}</p>
      <div class="rating">${getRatingStars(reviewData.rating)}</div>
      <p>${reviewData.review}</p>
      <button class="delete-review-button">Eliminar reseña</button>
    </div>
  `;

  reviewElement.innerHTML = reviewContent;

  // Agregar evento de clic al botón "Eliminar reseña"
  const deleteReviewButton = reviewElement.querySelector('.delete-review-button');
  deleteReviewButton.addEventListener('click', () => {
    deleteReview(reviewElement);
  });

  return reviewElement;
}

// Función para eliminar una reseña
function deleteReview(reviewElement) {
  // Obtener el índice de la reseña en el contenedor
  const index = Array.from(reviewsContainer.children).indexOf(reviewElement);

  // Eliminar la reseña del contenedor y de los datos de reseñas
  reviewsContainer.removeChild(reviewElement);
  reviewsData.splice(index, 1);

  // Actualizar los datos de reseñas en el almacenamiento local
  localStorage.setItem('reviewsData', JSON.stringify(reviewsData));
}

// Función para obtener los caracteres de estrella según la puntuación
function getRatingStars(rating) {
  const roundedRating = Math.round(rating);
  let stars = '';

  for (let i = 0; i < roundedRating; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  return stars;
}