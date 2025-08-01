import { useState } from 'react';

function PostForm({ onSubmit, initialValues = { title: '', body: '' } }) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) return;
    onSubmit(formData);
    setFormData({ title: '', body: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2>새 글 작성</h2>
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
          required
        />
      </div>
      <div>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
          required
        />
      </div>
      <button type="submit">등록</button>
    </form>
  );
}

export default PostForm;