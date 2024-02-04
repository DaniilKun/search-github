import { makeAutoObservable } from 'mobx';

class RepositoryStore {
  repositories = [];
  favoriteRepositories = [];
  selectedRepositoryName = '';

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }

  setRepositories(repositories) {
    this.repositories = repositories;
  }

  selectRepo(repoName) {
    this.selectedRepositoryName = repoName;
  }

  addToFavorites(repository) {
    if (!this.isFavorite(repository)) {
      this.favoriteRepositories.push(repository);
      this.saveFavorites();
    }
  }

  removeFromFavorites(repository) {
    this.favoriteRepositories = this.favoriteRepositories.filter(
      (item) => item.html_url !== repository.html_url
    );
    this.saveFavorites();
  }

  isFavorite(repository) {
    return this.favoriteRepositories.some(
      (item) => item.html_url === repository.html_url
    );
  }

  // Методы для сохранения и загрузки избранных репозиториев в локальное хранилище
  saveFavorites() {
    localStorage.setItem('favoriteRepositories', JSON.stringify(this.favoriteRepositories));
  }

  loadFavorites() {
    const favorites = localStorage.getItem('favoriteRepositories');
    if (favorites) {
      this.favoriteRepositories = JSON.parse(favorites);
    }
  }
}

export default new RepositoryStore();
