import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './Components/PostList';
import CreatePost from './Components/CreatePost';
import ViewPost from './Components/ViewPost';
import EditPost from './Components/EditPost';

function App() {
  return (
    <Router>
      <div>
        <h1>Мой блог на React</h1>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/:id" element={<ViewPost />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;