import React, { useMemo } from 'react';

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
};

const Post = ({ post, toggleVerify }) => {
  const backgroundColor = useMemo(() => getRandomColor(), []);

  return (
    <div style={{
      backgroundColor,
      padding: '1rem',
      marginBottom: '1rem',
      borderRadius: '10px',
      boxShadow: '0 0 5px rgba(0,0,0,0.2)'
    }}>
      <h3>ID: {post.id}</h3>
      <h4>Title: {post.title}</h4>
      <p>{post.body}</p>
      <button onClick={() => toggleVerify(post.id)}>
        {post.verifyPost ? 'Verified' : 'Verify'}
      </button>
    </div>
  );
};

export default React.memo(Post);