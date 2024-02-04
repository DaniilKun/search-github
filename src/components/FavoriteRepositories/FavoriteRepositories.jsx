import styles from './FavoriteRepositories.module.scss';
import RepositoryStore from '../../stores/RepositoryStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


const FavoriteRepositories = ({ html_url, full_name, stargazers_count, forks_count, owner }) => {
  const navigate = useNavigate();

  const removeFromFavorites = () => {
    RepositoryStore.removeFromFavorites({ html_url, full_name, stargazers_count, forks_count, owner });
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
