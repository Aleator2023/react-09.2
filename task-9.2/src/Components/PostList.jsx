import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки данных
  const [error, setError] = useState(''); // Состояние для отслеживания ошибок

  useEffect(() => {
    fetch('http://localhost:7070/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {posts.length > 0 ? posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link to={`/posts/${post.id}`}>Просмотреть</Link>
        </div>
      )) : <p>No posts found.</p>}
      <Link to="/posts/new">Создать пост</Link>
    </div>
  );
}

export default PostList;
