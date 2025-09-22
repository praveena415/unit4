
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Post from './Post';

const generateId = () => Math.random().toString(36).substr(2, 8);

const App = () => {
  const [timer, setTimer] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const addPost = useCallback(() => {
    if (!title.trim() || !body.trim()) return;
    const newPost = {
      id: generateId(),
      title,
      body,
      verifyPost: false,
    };
    setPosts(prev => [newPost, ...prev]);
    setTitle('');
    setBody('');
  }, [title, body]);

  const toggleVerify = useCallback((id) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id ? { ...post, verifyPost: !post.verifyPost } : post
      )
    );
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial' }}>
      <h2>React Performance Optimization</h2>
      <p>Timer: {timer}s</p>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <button onClick={addPost} style={{ padding: '8px 12px' }}>Add Post</button>

      <div style={{ marginTop: '2rem' }}>
        {posts.map(post => (
          <Post key={post.id} post={post} toggleVerify={toggleVerify} />
        ))}
      </div>
    </div>
  );
};

export default App;