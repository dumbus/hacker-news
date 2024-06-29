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
    setLoading(true);

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

  useEffect(() => {
    setStories([]);
    setLoading(true);
    setPage(1);
  }, [storyType]);

  const handleRefresh = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    setStories([]);
    setLoading(true);

    fetchStories();
    const newIntervalId = setInterval(fetchStories, 30000);
    setIntervalId(newIntervalId);
  };

  const handleLoadMore = () => {
    setStories([]);
    setLoading(true);
    window.scrollTo(0, 0);
    setPage((prevPage) => prevPage + 1);
  };

  const storiesToShow = stories.slice(0, (page + 1) * 15);

  const storiesContent = (
    <>
      <div className="button-container">
        <button onClick={handleRefresh}>Refresh</button>
      </div>
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
      <div className="button-container">
        <button className="list-button" onClick={handleLoadMore}>
          Load More
        </button>
      </div>
    </>
  );

  return (
    <>
      <h2 className="header">News Page</h2>
      {loading && stories.length === 0 ? <div>Loading...</div> : storiesContent}
    </>
  );
};

export default NewsList;
