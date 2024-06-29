import React from 'react';
import { Link } from 'react-router-dom';

import { Story } from '../types/interfaces';

interface NewsItemProps {
  storyData: Story;
  index?: number;
}

const NewsItem: React.FC<NewsItemProps> = ({ storyData, index }) => {
  const { id, title, url, score, by, kids } = storyData;

  return (
    <div>
      <h2>
        {index ? index : ''}{' '}
        <Link
          to={`/news/${id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {title}
        </Link>
      </h2>
      <p className="list-item-p">
        Original Url:
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: '5px' }}
        >
          {url}
        </a>
      </p>
      <p className="list-item-p">Score: {score}</p>
      <p className="list-item-p">By: {by}</p>
      {kids && <p className="list-item-p">Comments: {kids.length}</p>}
    </div>
  );
};

export default NewsItem;
