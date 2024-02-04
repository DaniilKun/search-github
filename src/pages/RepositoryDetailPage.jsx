import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import RepositoryStore from '../stores/RepositoryStore.js';
import styles from './RepositoryDetailPage.module.scss';
import { Link } from 'react-router-dom';


const RepositoryDetailPage = observer(() => {
    const navigate = useNavigate();
    const { repositoryId } = useParams();
    const [selectedRepo, setSelectedRepo] = useState(null);

    useEffect(() => {
        const allRepositories = [...RepositoryStore.repositories, ...RepositoryStore.favoriteRepositories];
        const foundRepo = allRepositories.find(repo => repo.full_name === repositoryId);
        
        if (!foundRepo) {
            navigate('/');
        } else {
            setSelectedRepo(foundRepo);
        }
    }, [repositoryId]);

    if (!selectedRepo) {
        return <h2>Loading...</h2>;
    }
    console.log(selectedRepo);
    return (
        <div>
            <h2 className={styles.title}>Подробная информация о репозитории {repositoryId}</h2>
            <div className={styles.root}>
                <img className={styles.ava} src={selectedRepo.owner.avatar_url} alt="Avatar" />
                <a href={selectedRepo.html_url}>{selectedRepo.full_name}</a>
                <div>Stars: {selectedRepo.stargazers_count}</div>
                <div>Forks: {selectedRepo.forks_count}</div>
                <div>Login: {selectedRepo.owner.login}</div>
                <div>Id: {selectedRepo.owner.id}</div>
                <div>Node_id: {selectedRepo.owner.node_id}</div>
                <div>Type: {selectedRepo.owner.type}</div>
            </div>
            <Link className={styles.back} to='/'>НАЗАД</Link>
        </div>
    );
});

export default RepositoryDetailPage;
