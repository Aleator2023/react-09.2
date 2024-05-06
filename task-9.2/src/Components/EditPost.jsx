import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
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
        setContent(data.content);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`http://localhost:7070/posts/${id}`, {
      method: 'PUT', // Или 'POST', если ваш API ожидает POST для обновления
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      return response.json();
    })
    .then(() => {
      navigate(`/posts/${id}`);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error updating post:', error);
      setError('Failed to update post');
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>Сохранить</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </form>
  );
}

export default EditPost;
