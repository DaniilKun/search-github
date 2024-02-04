import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import InputField from '../components/InputField/InputField';
import RepositoryList from '../components/RepositoryList/RepositoryList';
import RepositoryStore from '../stores/RepositoryStore';
import { observer } from 'mobx-react-lite';

import styles from './HomePage.module.scss';
import FavoriteRepositories from '../components/FavoriteRepositories/FavoriteRepositories';
// import CopyButton from '../components/CopyButton';

const HomePage = observer(() => {
  const [searchTerm, setSearchTerm] = useState('');
  const timeoutRef = useRef(null); // Используем useRef для хранения timeoutId
  const [searchError, setSearchError] = useState('');

  const handleSearchTermChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    const getData = async () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Если есть активный таймер, сбрасываем его
      }

      timeoutRef.current = setTimeout(async () => {
        try {
          if (searchTerm) {
            const response = await axios.get(
              `https://api.github.com/search/repositories?q=${searchTerm}`,
            );
            if (response.data.items.length === 0) {
              setSearchError('По данному ключевому слову ничего не найдено');
            } else {
              setSearchError('');
            }
            RepositoryStore.setRepositories(response.data.items);
          } else {
            RepositoryStore.setRepositories([]);
          }
        } catch (error) {
          console.error('Error fetching repositories:', error);
        }
      }, 500); // Задержка в 500 миллисекунд
    };
    getData();
  }, [searchTerm]);

  return (
    <>
      <InputField value={searchTerm} onChange={handleSearchTermChange} />
      {/* <CopyButton/> */}
      <div className={styles.lists}>
        <div>
          <h2 className={styles.listRegular}>Список репозиториев:</h2>
          {searchTerm ? (
            <>
              {searchError ? (
                <p className={styles.error}>{searchError}</p>
              ) : (
                RepositoryStore.repositories.map((obj) => <RepositoryList {...obj} key={obj.id} />)
              )}
            </>
          ) : (
            <h2 className={styles.startText}>
              Начните вписывать ключевое слово в поле поиска и увидите список репозиториев
            </h2>
          )}
        </div>
        {RepositoryStore.favoriteRepositories.length ? (
          <div className={styles.favorite}>
            <h2 className={styles.listFavorite}>Список с избранными репозиториями:</h2>
            {RepositoryStore.favoriteRepositories.map((obj,index) => (
              <FavoriteRepositories {...obj} key={index} />
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
});

export default HomePage;
