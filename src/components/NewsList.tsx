import React, { useEffect, useState, useCallback } from 'react';

import NewsItem from './NewsItem';

import HackerNewsService from '../services/HackerNewsService';

import { Story } from '../types/interfaces';

type StoryType = 'beststories' | 'newstories' | 'topstories';

const NewsList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<StoryType>('newstories');

  const hackerNewsService = new HackerNewsService();

  const fetchStories = useCallback(async () => {
    setLoading(true);

    const data = await hackerNewsService.getStories();

    setStories(data);
    setLoading(false);
  }, [type]);

  useEffect(() => {
    fetchStories();

    const interval = setInterval(fetchStories, 30000);
    return () => clearInterval(interval);
  }, [fetchStories]);

  const storiesToShow = stories.slice(0, (page + 1) * 15);

  return (
    <>
      {storiesToShow.map((storyData) => (
        <NewsItem key={storyData.id} storyData={storyData} />
      ))}
    </>
  );
};

export default NewsList;
