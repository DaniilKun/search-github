import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import RepositoryStore from '../../stores/RepositoryStore';
import styles from './FavoriteRepositories.module.scss';

interface RepositoryProps {
  html_url: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    avatar_url: string;
  };
}

const FavoriteRepositories: React.FC<RepositoryProps> = ({
  html_url,
  full_name,
  stargazers_count,
  forks_count,
  owner,
}) => {
  const navigate = useNavigate();

  const removeFromFavorites = () => {
    RepositoryStore.removeFromFavorites({ html_url });
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
      <button className={styles.detailed} onClick={goToRepositoryPage}>Подробнее</button>
      <button className={styles.favourites} onClick={removeFromFavorites}>
        Убрать из избранных
      </button>
    </div>
  );
};

export default observer(FavoriteRepositories);
