import React, { useEffect, useState, useCallback } from 'react';

import NewsItem from './NewsItem';

import HackerNewsService from '../services/HackerNewsService';

import { Story, StoryType } from '../types/interfaces';

interface NewsListProps {
  storyType: StoryType;
}

const NewsList: React.FC<NewsListProps> = ({ storyType }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const hackerNewsService = new HackerNewsService();

  const fetchStories = useCallback(async () => {
    const data = await hackerNewsService.getStories(storyType, page);

    setStories(data);
    setLoading(false);
  }, [storyType, page]);

  useEffect(() => {
    fetchStories();

    const id = setInterval(fetchStories, 3000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [fetchStories]);

  const handleRefresh = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    setLoading(true);

    fetchStories();
    const newIntervalId = setInterval(fetchStories, 30000);
    setIntervalId(newIntervalId);
  };

  const handleLoadMore = () => {
    setLoading(true);
    window.scrollTo(0, 0);
    setPage((prevPage) => prevPage + 1);
  };

  const storiesToShow = stories.slice(0, (page + 1) * 15);

  const storiesContent = (
    <>
      <button onClick={handleRefresh}>Refresh</button>
      {storiesToShow.map((storyData, index) => {
        const storyIndex = (page - 1) * 15 + index + 1;

        return (
          <NewsItem
            key={storyData.id}
            storyData={storyData}
            index={storyIndex}
          />
        );
      })}
      <button onClick={handleLoadMore}>Load More</button>
    </>
  );

  return (
    <>
      <h2>News Page</h2>
      {loading ? <div>Loading...</div> : storiesContent}
    </>
  );
};

export default NewsList;
