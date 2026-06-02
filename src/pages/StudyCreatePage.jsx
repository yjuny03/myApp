// src/pages/StudyCreatePage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

function StudyCreatePage() {
  const navigate = useNavigate();
  const { addStudy, showToast } = useAppContext();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("React");
  const [level, setLevel] = useState("입문");
  const [method, setMethod] = useState("온라인");
  const [maxMember, setMaxMember] = useState(4);
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      alert("스터디 제목을 입력하세요.");
      return;
    }

    if (content.trim() === "") {
      alert("스터디 설명을 입력하세요.");
      return;
    }

    const newStudy = {
      id: Date.now(),
      title,
      content,
      category,
      level,
      method,
      writer: "준영",
      maxMember,
      currentMember: 1,
      status: "RECRUITING",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    addStudy(newStudy);
    showToast("스터디가 등록되었습니다.");
    navigate("/studies");
  };

  return (
    <section className="form-page">
      <h2>스터디 만들기</h2>
      <p>모집할 스터디 정보를 입력하세요.</p>

      <form className="study-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>스터디 제목</label>
          <input
            type="text"
            placeholder="예: React 입문 스터디"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="React">React</option>
              <option value="Spring">Spring</option>
              <option value="Algorithm">Algorithm</option>
              <option value="DB">DB</option>
            </select>
          </div>

          <div className="form-group">
            <label>난이도</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="입문">입문</option>
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="고급">고급</option>
            </select>
          </div>

          <div className="form-group">
            <label>진행 방식</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="온라인">온라인</option>
              <option value="오프라인">오프라인</option>
              <option value="온·오프라인">온·오프라인</option>
            </select>
          </div>

          <div className="form-group">
            <label>모집 인원</label>
            <input
              type="number"
              min="2"
              max="10"
              value={maxMember}
              onChange={(e) => setMaxMember(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="form-group">
          <label>스터디 설명</label>
          <textarea
            placeholder="스터디 목표, 진행 방식, 일정 등을 적어주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/studies")}
          >
            취소
          </button>

          <button type="submit" className="primary-button">
            등록하기
          </button>
        </div>
      </form>
    </section>
  );
}

export default StudyCreatePage;