import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <Link to={`/news/`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 className="header">Hacker News</h1>
      </Link>
    </header>
  );
};

export default Header;
