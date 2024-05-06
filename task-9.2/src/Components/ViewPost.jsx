import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ViewPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:7070/posts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        return response.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) { // Add confirmation dialog
      fetch(`http://localhost:7070/posts/${id}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete post');
          }
          navigate('/');
        })
        .catch(error => {
          console.error('Error deleting post:', error);
          setError('Failed to delete post');
        });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return post ? (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={() => navigate(`/posts/edit/${id}`)}>Редактировать</button>
      <button onClick={handleDelete}>Удалить</button>
    </div>
  ) : (
    <p>Post not found.</p>
  );
}

export default ViewPost;
