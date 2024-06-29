import React from 'react';

import { Story } from '../types/interfaces';

import CommentsList from './CommentsList';

interface NewsItemProps {
  storyData: Story;
  index: number;
}

const NewsItem: React.FC<NewsItemProps> = ({ storyData, index }) => {
  const { id, title, url, score, by, kids } = storyData;

  return (
    <div>
      <h2>
        {index}. {title}
      </h2>
      <p>Url: {url}</p>
      <p>Score: {score}</p>
      <p>By: {by}</p>
      {kids && <p>Comments: {kids.length}</p>}
      <CommentsList storyId={id} />
    </div>
  );
};

export default NewsItem;
