import PostItem from './PostItem';

function PostList({ posts, onDelete, onUpdate }) {
  if (posts.length === 0) {
    return <p>등록된 포스트가 없습니다.</p>;
  }

  return (
    <div className="post-list">
      <h2>포스트 목록</h2>
      {posts.map(post => (
        <PostItem 
          key={post.id} 
          post={post} 
          onDelete={onDelete} 
          onUpdate={onUpdate} 
        />
      ))}
    </div>
  );
}

export default PostList;