// src/pages/NotFoundPage.jsx

import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-code">404</span>

        <h2>페이지를 찾을 수 없습니다.</h2>

        <p>
          요청한 주소가 잘못되었거나, 해당 페이지가 삭제되었을 수 있습니다.
          홈 또는 스터디 목록으로 이동해 다시 확인해주세요.
        </p>

        <div className="not-found-actions">
          <Link className="primary-button" to="/">
            홈으로 이동
          </Link>

          <Link className="secondary-button" to="/studies">
            스터디 목록
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;