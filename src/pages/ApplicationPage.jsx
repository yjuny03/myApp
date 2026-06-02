// src/pages/ApplicationPage.jsx

import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext.js";

function ApplicationPage() {
  const { studies, applications, cancelApplication, showToast } = useAppContext();

  const applicationItems = applications.map((application) => {
    const study = studies.find((item) => item.id === application.studyId);

    return {
      ...application,
      study,
    };
  });

  return (
    <section>
      <div className="page-title-row">
        <div>
          <h2>신청 내역</h2>
          <p>내가 신청한 스터디와 신청 상태를 확인할 수 있습니다.</p>
        </div>

        <Link className="primary-button" to="/studies">
          스터디 보러가기
        </Link>
      </div>

      {applicationItems.length === 0 ? (
        <div className="empty-box">
          아직 신청한 스터디가 없습니다.
          <br />
          스터디 상세 페이지에서 신청하기 버튼을 눌러보세요.
        </div>
      ) : (
        <div className="application-list">
          {applicationItems.map((application) => {
            if (!application.study) {
              return null;
            }

            return (
              <article className="application-card" key={application.id}>
                <div>
                  <div className="badge-row">
                    <span className="category">
                      {application.study.category}
                    </span>
                    <span className="level-badge">
                      {application.study.level}
                    </span>
                    <span className="application-status">
                      {application.status === "PENDING" && "승인 대기중"}
                      {application.status === "APPROVED" && "승인됨"}
                      {application.status === "REJECTED" && "거절됨"}
                    </span>
                  </div>

                  <h3>{application.study.title}</h3>

                  <p>{application.message}</p>

                  <div className="study-meta">
                    <span>신청자: {application.applicantName}</span>
                    <span>신청일: {application.createdAt}</span>
                    <span>
                      인원: {application.study.currentMember} /{" "}
                      {application.study.maxMember}
                    </span>
                  </div>
                </div>

                <div className="application-actions">
                  <Link
                    className="primary-button"
                    to={`/chat/${application.study.id}`}
                  >
                    채팅방 입장
                  </Link>

                  <Link
                    className="secondary-button"
                    to={`/studies/${application.study.id}`}
                  >
                    상세 보기
                  </Link>

                  <button
                    className="danger-button"
                    onClick={() => {cancelApplication(application.study.id);
                        showToast("스터디 신청이 취소되었습니다.", "info");
                    }}
                  >
                    신청 취소
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ApplicationPage;