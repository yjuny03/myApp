// src/components/study/StudyCard.tsx

import { Link } from "react-router-dom";

type StudyStatus = "RECRUITING" | "CLOSED";

type Study = {
  id: number;
  title: string;
  content: string;
  category: string;
  level: string;
  method: string;
  writer: string;
  maxMember: number;
  currentMember: number;
  status: StudyStatus;
  createdAt: string;
};

type StudyCardProps = {
  study: Study;
  isBookmarked: boolean;
  onToggleBookmark: (studyId: number) => void;
};

function StudyCard({
  study,
  isBookmarked,
  onToggleBookmark,
}: StudyCardProps) {
  const progressPercent = Math.round(
    (study.currentMember / study.maxMember) * 100
  );

  return (
    <article className="study-card">
      <div className="study-card-header">
        <div className="badge-row">
          <span className="category">{study.category}</span>
          <span className="level-badge">{study.level}</span>
          <span className="method-badge">{study.method}</span>
        </div>

        <button
          type="button"
          className={isBookmarked ? "bookmark-button active" : "bookmark-button"}
          onClick={() => onToggleBookmark(study.id)}
        >
          {isBookmarked ? "★" : "☆"}
        </button>
      </div>

      <h3>{study.title}</h3>

      <p>{study.content}</p>

      <div className="study-meta">
        <span>작성자: {study.writer}</span>
        <span>작성일: {study.createdAt}</span>
      </div>

      <div className="member-progress">
        <div className="member-progress-top">
          <span>모집 인원</span>
          <strong>
            {study.currentMember} / {study.maxMember}
          </strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="study-card-footer">
        <span
          className={
            study.status === "RECRUITING"
              ? "status recruiting"
              : "status closed"
          }
        >
          {study.status === "RECRUITING" ? "모집중" : "마감"}
        </span>

        <Link className="detail-link" to={`/studies/${study.id}`}>
          자세히 보기
        </Link>
      </div>
    </article>
  );
}

export default StudyCard;