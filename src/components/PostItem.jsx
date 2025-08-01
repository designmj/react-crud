import { useState } from 'react';

function PostItem({ post, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editData, setEditData] = useState({ title: post.title, body: post.body }); // 수정 데이터 상태

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdate = () => {
    if (!editData.title.trim() || !editData.body.trim()) {
      alert('제목과 내용을 입력해주세요.'); // 입력값 유효성 검사
      return;
    }
    onUpdate(post.id, editData); // 부모 컴포넌트의 updatePost 함수 호출
    setIsEditing(false); // 수정 모드 종료
  };

  return (
    <div className="post-item">
      {isEditing ? (
        // 수정 모드일 때
        <div className="edit-mode-container"> {/* 수정 모드 전용 컨테이너 */}
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            className="edit-input" // 새 클래스 추가 (스타일링 위함)
          />
          <textarea
            name="body"
            value={editData.body}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            className="edit-textarea" // 새 클래스 추가 (스타일링 위함)
          />
          <div className="button-group">
            <button onClick={handleUpdate}>저장</button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </div>
        </div>
      ) : (
        // 일반 보기 모드일 때
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <div className="button-group">
            <button onClick={() => setIsEditing(true)}>수정</button> {/* 수정 모드 시작 버튼 */}
            <button onClick={() => onDelete(post.id)}>삭제</button>
          </div>
        </>
      )}
    </div>
  );
}

export default PostItem;