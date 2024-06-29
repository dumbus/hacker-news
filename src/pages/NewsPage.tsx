import React, { useState } from 'react';

import NewsList from '../components/NewsList';

import { StoryType } from '../types/interfaces';

const NewsPage: React.FC = () => {
  const [storyType, setStoryType] = useState<StoryType>('newstories');

  const handleTypeChange = (type: StoryType) => {
    setStoryType(type);
  };

  return (
    <>
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
      <NewsList storyType={storyType} />
    </>
  );
};

export default NewsPage;
