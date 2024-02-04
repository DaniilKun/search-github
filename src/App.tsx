import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RepositoryDetailPage from './pages/RepositoryDetailPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:repositoryId" element={<RepositoryDetailPage />} />
    </Routes>
  );
};

export default App;
