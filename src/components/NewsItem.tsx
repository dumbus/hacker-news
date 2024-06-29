import React from 'react';

import { Story } from '../types/interfaces';

interface NewsItemProps {
  storyData: Story;
}

const NewsItem: React.FC<NewsItemProps> = ({ storyData }) => {
  const { title, url, score, by, kids } = storyData;

  return (
    <div>
      <h2>{title}</h2>
      <p>Url: {url}</p>
      <p>Score: {score}</p>
      <p>By: {by}</p>
      {kids && <p>Comments: {kids.length}</p>}
    </div>
  );
};

export default NewsItem;
