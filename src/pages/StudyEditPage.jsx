// src/pages/StudyEditPage.jsx

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

function StudyEditPage() {
  const navigate = useNavigate();
  const { studyId } = useParams();

  const { studies, updateStudy, showToast } = useAppContext();

  const study = studies.find((item) => item.id === Number(studyId));

  const [title, setTitle] = useState(study ? study.title : "");
  const [category, setCategory] = useState(study ? study.category : "React");
  const [level, setLevel] = useState(study ? study.level : "입문");
  const [method, setMethod] = useState(study ? study.method : "온라인");
  const [maxMember, setMaxMember] = useState(study ? study.maxMember : 4);
  const [content, setContent] = useState(study ? study.content : "");
  const [status, setStatus] = useState(study ? study.status : "RECRUITING");

  if (!study) {
    return (
      <section>
        <h2>수정할 스터디를 찾을 수 없습니다.</h2>
        <Link to="/studies">목록으로 돌아가기</Link>
      </section>
    );
  }

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

    const updatedStudy = {
      ...study,
      title,
      category,
      level,
      method,
      maxMember,
      content,
      status,
    };

    updateStudy(updatedStudy);
    showToast("스터디 정보가 수정되었습니다.");
    navigate(`/studies/${study.id}`);
  };

  return (
    <section className="form-page">
      <h2>스터디 수정</h2>
      <p>스터디 모집 정보를 수정하세요.</p>

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

          <div className="form-group">
            <label>모집 상태</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="RECRUITING">모집중</option>
              <option value="CLOSED">마감</option>
            </select>
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
            onClick={() => navigate(`/studies/${study.id}`)}
          >
            취소
          </button>

          <button type="submit" className="primary-button">
            수정 완료
          </button>
        </div>
      </form>
    </section>
  );
}

export default StudyEditPage;