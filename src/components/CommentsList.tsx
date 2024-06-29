import React, { useState, useEffect } from 'react';

import HackerNewsService from '../services/HackerNewsService';

import CommentsItem from './CommentsItem';

interface CommentsListProps {
  storyId: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ storyId }) => {
  const [commentsIds, setCommentsIds] = useState<number[]>([]);

  const hackerNewsService = new HackerNewsService();

  useEffect(() => {
    const fetchStoryDetails = async () => {
      const story = await hackerNewsService.getStoryDetails(storyId);
      if (story) {
        setCommentsIds(story.kids);
      }
    };

    fetchStoryDetails();
  }, [storyId]);

  return (
    <div>
      <h3 className="header">Comments</h3>
      {commentsIds.length > 0 ? (
        commentsIds.map((commentId) => (
          <CommentsItem key={commentId} commentId={commentId} />
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentsList;
