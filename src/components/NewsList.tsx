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
  const [loading, setLoading] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const hackerNewsService = new HackerNewsService();

  const fetchStories = useCallback(async () => {
    setLoading(true);

    const data = await hackerNewsService.getStories(storyType, page);

    setStories(data);
    setLoading(false);
  }, [storyType, page]);

  useEffect(() => {
    fetchStories();

    const id = setInterval(fetchStories, 30000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [fetchStories]);

  const handleRefresh = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    fetchStories();
    const newIntervalId = setInterval(fetchStories, 30000);
    setIntervalId(newIntervalId);
  };

  const storiesToShow = stories.slice(0, (page + 1) * 15);

  const storiesContent = storiesToShow.map((storyData) => (
    <NewsItem key={storyData.id} storyData={storyData} />
  ));

  return (
    <>
      <h2>News Page</h2>
      <div>
        <button onClick={handleRefresh}>Refresh</button>{' '}
      </div>
      {loading ? <div>Loading...</div> : storiesContent}
    </>
  );
};

export default NewsList;
