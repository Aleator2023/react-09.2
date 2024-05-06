
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = { title, content };

    try {
      const response = await fetch('http://localhost:7070/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      
      if (!response.ok) {
        throw new Error(`Error creating post: ${response.status}`);
      }

      
      if (response.status === 204) {
        navigate('/');
        return;
      }

      
      const responseText = await response.text();
      const responseData = responseText ? JSON.parse(responseText) : {};

      console.log('Post created:', responseData);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Ошибка при создании поста');
    }
  };

  return (
    <div>
      <h2>Создать новый пост</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Заголовок:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Контент:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}

export default CreatePost;
