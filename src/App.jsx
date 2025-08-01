import { useEffect, useState } from 'react'

import './App.css'
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import {v4 as uuidv4} from 'uuid'

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // READ - 전체 포스트 불러오기
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('서버 에러');
      const data = await response.json();
      setPosts(data.slice(0, 5)); // 10개만 가져오기
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // CREATE - 새 포스트 추가
  const addPost = async (newPost) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: newPost.title,
          body: newPost.body,
          userId: 1
        }),
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = await response.json();
      // JSONPlaceholder는 실제로 추가 안 되니까 직접 state 업데이트
      setPosts([{ ...data, id: uuidv4() }, ...posts]);
      
    } catch (err) {
      setError(err.message);
    }
  };

  // UPDATE - 포스트 수정
  const updatePost = async (id, updatedPost) => {
  try {
    // 서버 요청 시도는 하되
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPost),
      headers: {
        'Content-type': 'application/json'
      }
    });
    // 성공 여부와 상관없이 UI 업데이트
    setPosts(posts.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  } catch (err) {
    console.error("API 에러 무시하고 UI만 업데이트:", err);
    // 에러가 나도 UI는 업데이트
    setPosts(posts.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  }
};

  // DELETE - 포스트 삭제
  const deletePost = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
      });
      // 성공하면 UI에서 삭제
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <div className="App">
      <h1>React CRUD</h1>
      <PostForm onSubmit={addPost} />
      <PostList 
        posts={posts} 
        onDelete={deletePost} 
        onUpdate={updatePost} 
      />
    </div>
  );
}
export default App
