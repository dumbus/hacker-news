import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

import HackerNewsService from '../services/HackerNewsService';

import { Comment } from '../types/interfaces';

interface CommentItemProps {
  commentId: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ commentId }) => {
  const [comment, setComment] = useState<Comment | null>(null);

  const hackerNewsService = new HackerNewsService();

  useEffect(() => {
    const fetchComment = async () => {
      const data = await hackerNewsService.getCommentDetails(commentId);
      setComment(data);
    };

    fetchComment();
  }, [commentId]);

  if (!comment) {
    return <p>Comment is Loading...</p>;
  }

  const cleanHTML = (html: string) => {
    return DOMPurify.sanitize(html);
  };

  return (
    <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
      <p>
        <strong>{comment.author}</strong>
        <p>Score: {comment.score}</p>
      </p>
      <div dangerouslySetInnerHTML={{ __html: cleanHTML(comment.text) }} />
      {comment.kids && comment.kids.length > 0 && (
        <div>
          {comment.kids.map((kidId) => (
            <CommentItem key={kidId} commentId={kidId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
