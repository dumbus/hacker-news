import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NewsPage from './pages/NewsPage';
import NewsItemPage from './pages/NewsItemPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsItemPage />} />
      </Routes>
    </Router>
  );
};

export default App;
