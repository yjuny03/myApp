// src/pages/BookmarkPage.jsx

import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import StudyCard from "../components/study/StudyCard";

function BookmarkPage() {
  const { studies, bookmarks, toggleBookmark, isBookmarked } = useAppContext();

  const bookmarkedStudies = studies.filter((study) =>
    bookmarks.includes(study.id)
  );

  return (
    <section>
      <div className="page-title-row">
        <div>
          <h2>북마크한 스터디</h2>
          <p>관심 있는 스터디를 따로 모아볼 수 있습니다.</p>
        </div>

        <Link className="primary-button" to="/studies">
          스터디 보러가기
        </Link>
      </div>

      {bookmarkedStudies.length === 0 ? (
        <div className="empty-box">
          아직 북마크한 스터디가 없습니다.
          <br />
          스터디 목록에서 관심 있는 스터디를 저장해보세요.
        </div>
      ) : (
        <div className="study-list">
          {bookmarkedStudies.map((study) => (
            <StudyCard
              key={study.id}
              study={study}
              isBookmarked={isBookmarked(study.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default BookmarkPage;