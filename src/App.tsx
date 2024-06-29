import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import NewsPage from './pages/NewsPage';
import NewsItemPage from './pages/NewsItemPage';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<NewsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsItemPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
