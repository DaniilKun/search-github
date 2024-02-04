import { makeAutoObservable } from 'mobx';

interface Repository {
  html_url: string;
}

class RepositoryStore {
  repositories: Repository[] = [];
  favoriteRepositories: Repository[] = [];
  selectedRepositoryName: string = '';

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }

  setRepositories(repositories: Repository[]) {
    this.repositories = repositories;
  }

  selectRepo(repoName: string) {
    this.selectedRepositoryName = repoName;
  }

  addToFavorites(repository: Repository) {
    if (!this.isFavorite(repository)) {
      this.favoriteRepositories.push(repository);
      this.saveFavorites();
    }
  }

  removeFromFavorites(repository: Repository) {
    this.favoriteRepositories = this.favoriteRepositories.filter(
      (item) => item.html_url !== repository.html_url
    );
    this.saveFavorites();
  }

  isFavorite(repository: Repository) {
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
