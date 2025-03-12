document.addEventListener('DOMContentLoaded', function () {
    const reviewsContainer = document.getElementById('reviews-feed');
    const reviewForm = document.getElementById('reviewForm');
    const filterRating = document.getElementById('filterRating');
    const sortBy = document.getElementById('sortBy');

    let reviews = [
        { name: 'Иван', text: 'Отличный продукт!', rating: 5, date: new Date('2024-05-01') },
        { name: 'Мария', text: 'Неплохо, но есть куда расти.', rating: 4, date: new Date('2024-07-05') },
        { name: 'Алексей', text: 'Средненько.', rating: 3, date: new Date('2024-09-10') }
    ];

    function renderReviews() {
        reviewsContainer.innerHTML = '';
        const filteredReviews = reviews.filter(review => {
            const ratingFilter = parseInt(filterRating.value);
            return ratingFilter === 0 || review.rating === ratingFilter;
        });

        const sortedReviews = filteredReviews.sort((a, b) => {
            if (sortBy.value === 'date') {
                return b.date - a.date;
            } else {
                return b.rating - a.rating;
            }
        });

        sortedReviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review-feed');
            reviewElement.innerHTML = `
                <h3>${review.name}</h3>
                <p>${review.text}</p>
                <div class="rating">Оценка: ${review.rating}</div>
                <small>${review.date.toLocaleDateString()}</small>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    }

    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const text = document.getElementById('text').value;
        const rating = parseInt(document.getElementById('rating').value);

        if (name && text && rating >= 1 && rating <= 5) {
            reviews.push({ name, text, rating, date: new Date() });
            renderReviews();
            reviewForm.reset();
        } else {
            alert('Пожалуйста, заполните все поля корректно.');
        }
    });

    filterRating.addEventListener('change', renderReviews);
    sortBy.addEventListener('change', renderReviews);

    renderReviews();
});