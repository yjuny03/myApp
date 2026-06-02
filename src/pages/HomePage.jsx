// src/pages/HomePage.jsx

import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

function HomePage() {
  const { studies, bookmarks } = useAppContext();

  const recruitingCount = studies.filter(
    (study) => study.status === "RECRUITING"
  ).length;

  const closedCount = studies.filter((study) => study.status === "CLOSED").length;

  const recentStudies = studies.slice(0, 3);

  return (
    <section className="home-page">
      <div className="hero">
        <p className="hero-label">React Study Platform</p>
        <h2>스터디 모집부터 관심 스터디 관리까지</h2>
        <p>
          스터디 모집글을 작성하고, 관심 있는 스터디를 북마크하며, 참여할
          스터디를 한 곳에서 관리할 수 있는 웹 애플리케이션입니다.
        </p>

        <div className="hero-actions">
          <Link className="primary-button" to="/studies">
            스터디 보러가기
          </Link>
          <Link className="secondary-button" to="/bookmarks">
            북마크 보기
          </Link>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <span>전체 스터디</span>
          <strong>{studies.length}</strong>
        </div>

        <div className="stat-card">
          <span>모집중</span>
          <strong>{recruitingCount}</strong>
        </div>

        <div className="stat-card">
          <span>마감</span>
          <strong>{closedCount}</strong>
        </div>

        <div className="stat-card">
          <span>북마크</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <div className="home-section">
        <div className="section-title-row">
          <h3>최근 등록된 스터디</h3>
          <Link to="/studies">전체 보기</Link>
        </div>

        <div className="recent-list">
          {recentStudies.map((study) => (
            <Link
              className="recent-item"
              to={`/studies/${study.id}`}
              key={study.id}
            >
              <span>{study.category}</span>
              <strong>{study.title}</strong>
              <small>
                {study.currentMember} / {study.maxMember}명
              </small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;