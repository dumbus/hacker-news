import React, { useState, useRef } from 'react';

import NewsList from '../components/NewsList';

import { StoryType } from '../types/interfaces';

const NewsPage: React.FC = () => {
  const [storyType, setStoryType] = useState<StoryType>('newstories');

  const handleTypeChange = (type: StoryType) => {
    setStoryType(type);
  };

  return (
    <div>
      <header>
        <h1>Hacker News</h1>
        <div>
          <button onClick={() => handleTypeChange('newstories')}>
            New Stories
          </button>
          <button onClick={() => handleTypeChange('beststories')}>
            Best Stories
          </button>
          <button onClick={() => handleTypeChange('topstories')}>
            Top Stories
          </button>
        </div>
      </header>
      <main>
        <NewsList storyType={storyType} />
      </main>
    </div>
  );
};

export default NewsPage;
