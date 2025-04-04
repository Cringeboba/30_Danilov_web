class GameSearch {
  constructor(apiKey, searchInputId, searchButtonId, resultsDivId) {
    this.apiKey = apiKey;
    this.searchInput = document.getElementById(searchInputId);
    this.searchButton = document.getElementById(searchButtonId);
    this.resultsDiv = document.getElementById(resultsDivId);
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    this.searchButton.addEventListener('click', () => this.handleSearch());
    
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSearch();
      }
    });
  }
  
  handleSearch() {
    const query = this.searchInput.value.trim();
    if (query) {
      this.searchGames(query);
    }
  }
  
  async searchGames(query) {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${this.apiKey}&search=${query}&page_size=12`
      );
      const data = await response.json();
      this.displayResults(data.results);
    } catch (error) {
      console.error('Ошибка:', error);
      this.resultsDiv.innerHTML = '<p>Произошла ошибка. Попробуйте позже.</p>';
    }
  }
  
  displayResults(games) {
    if (games.length === 0) {
      this.resultsDiv.innerHTML = '<p>Игры не найдены. Попробуйте другой запрос.</p>';
      return;
    }
  
    this.resultsDiv.innerHTML = games
      .map(
        (game) => `
        <div class="game-card">
          <img src="${game.background_image || 'https://via.placeholder.com/300x150?text=No+Image'}" alt="${game.name}">
          <div class="game-info">
            <h3>${game.name}</h3>
            <p>Рейтинг: ${game.rating || 'N/A'}</p>
            <p>Дата выхода: ${game.released || 'Неизвестно'}</p>
          </div>
        </div>
      `
      )
      .join('');
  }
}

const gameSearch = new GameSearch(
  '405f69c3011f4062bb5c5cc7d58557c5',
  'searchInput',
  'searchButton',
  'results'
);