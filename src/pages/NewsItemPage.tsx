import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import HackerNewsService from '../services/HackerNewsService';

import NewsItem from '../components/NewsItem';
import CommentsList from '../components/CommentsList';

import { Story } from '../types/interfaces';

const NewsItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [storyData, setStoryData] = useState<Story | null>(null);
  const [showComments, setShowComments] = useState(false);

  const hackerNewsService = new HackerNewsService();

  useEffect(() => {
    const fetchStory = async () => {
      const data = await hackerNewsService.getStoryDetails(Number(id));

      setStoryData(data);
      setLoading(false);
    };

    fetchStory();
  }, [id]);

  const handleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!storyData) {
    return <div>Story not found!</div>;
  }

  return (
    <div>
      <NewsItem storyData={storyData} />
      <button onClick={handleComments}>Show comments</button>
      {showComments ? <CommentsList storyId={storyData.id} /> : ''}
    </div>
  );
};

export default NewsItemPage;
