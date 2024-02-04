import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RepositoryDetailPage from './pages/RepositoryDetailPage'; // Импортируем компонент

const App = () => {
  return (

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:repositoryId" element={<RepositoryDetailPage />} /> {/* Маршрут для страницы репозитория */}
      </Routes>

  );
};

export default App;
