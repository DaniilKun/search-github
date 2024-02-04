import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import InputField from '../components/InputField/InputField';
import RepositoryList from '../components/RepositoryList/RepositoryList';
import RepositoryStore from '../stores/RepositoryStore';
import { observer } from 'mobx-react-lite';
import styles from './HomePage.module.scss';
import FavoriteRepositories from '../components/FavoriteRepositories/FavoriteRepositories';

const HomePage = observer(() => {
  const [searchTerm, setSearchTerm] = useState('');
  const timeoutRef = useRef(null);
  const [searchError, setSearchError] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(async () => {
        try {
          if (searchTerm) {
            const response = await axios.get(
              `https://api.github.com/search/repositories?q=${searchTerm}`,
            );
            setSearchError(response.data.items.length === 0 ? 'По данному ключевому слову ничего не найдено' : '');
            RepositoryStore.setRepositories(response.data.items);
          } else {
            RepositoryStore.setRepositories([]);
          }
        } catch (error) {
          console.error('Error fetching repositories:', error);
        }
      }, 500);
    };

    fetchData();

    return () => clearTimeout(timeoutRef.current);
  }, [searchTerm]);

  return (
    <>
      <InputField value={searchTerm} onChange={handleSearchTermChange} />
      <div className={styles.lists}>
        <div>
          <h2 className={styles.listRegular}>Список репозиториев:</h2>
          {searchTerm ? (
            searchError ? <p className={styles.error}>{searchError}</p> :
              RepositoryStore.repositories.map((obj) => <RepositoryList {...obj} key={obj.id} />)
          ) : (
            <h2 className={styles.startText}>
              Начните вписывать ключевое слово в поле поиска и увидите список репозиториев
            </h2>
          )}
        </div>
        {RepositoryStore.favoriteRepositories.length > 0 && (
          <div className={styles.favorite}>
            <h2 className={styles.listFavorite}>Список с избранными репозиториями:</h2>
            {RepositoryStore.favoriteRepositories.map((obj, index) => (
              <FavoriteRepositories {...obj} key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
});

export default HomePage;
