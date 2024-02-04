import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import styles from './RepositoryList.module.scss';
import RepositoryStore from '../../stores/RepositoryStore';

const RepositoryList = ({ html_url, full_name, stargazers_count, forks_count, owner }) => {
  const navigate = useNavigate();

  const addToFavorites = () => {
    const repository = { html_url, full_name, stargazers_count, forks_count, owner };
    if (!RepositoryStore.isFavorite(repository)) {
      RepositoryStore.addToFavorites(repository);
    } else {
      RepositoryStore.removeFromFavorites(repository);
    }
  };

  const goToRepositoryPage = () => {
    RepositoryStore.selectRepo(full_name);
    navigate(`/${encodeURIComponent(full_name)}`); // Переходим на страницу репозитория
  };

  return (
    <div className={styles.root}>
      <img className={styles.ava} src={owner.avatar_url} alt="Avatar" />
      <a href={html_url}>{full_name}</a>
      <div>Stars: {stargazers_count}</div>
      <div>Forks: {forks_count}</div>
      <button className={styles.detailed} onClick={goToRepositoryPage}>
        Подробнее
      </button>
      <button className={styles.favourites} onClick={addToFavorites}>
        {RepositoryStore.isFavorite({ html_url }) ? 'Убрать из избранных' : 'Добавить в избранное'}
      </button>
    </div>
  );
};

export default observer(RepositoryList);
