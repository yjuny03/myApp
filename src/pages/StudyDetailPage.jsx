// src/pages/StudyDetailPage.jsx

import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext.js";

function StudyDetailPage() {
    const navigate = useNavigate();
    const { studyId } = useParams();

    const {
        studies,
        deleteStudy,
        toggleBookmark,
        isBookmarked,
        applyStudy,
        cancelApplication,
        getApplicationByStudyId,
        showToast,
    } = useAppContext();

    const study = studies.find((item) => item.id === Number(studyId));

    if (!study) {
        return (
            <section>
                <h2>스터디를 찾을 수 없습니다.</h2>
                <Link to="/studies">목록으로 돌아가기</Link>
            </section>
        );
    }

    const application = getApplicationByStudyId(study.id);

    const progressPercent = Math.round(
        (study.currentMember / study.maxMember) * 100
    );

    const handleApply = () => {
        applyStudy(study.id);
        showToast("스터디 신청이 완료되었습니다.");
    };

    const handleCancelApplication = () => {
        const confirmCancel = window.confirm("스터디 신청을 취소하시겠습니까?");

        if (!confirmCancel) {
            return;
        }

        cancelApplication(study.id);
        showToast("스터디 신청이 취소되었습니다.", "info");
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");

        if (!confirmDelete) {
            return;
        }

        deleteStudy(study.id);
        showToast("스터디가 삭제되었습니다.", "info");
        navigate("/studies");
    };

    return (
        <section className="detail-page">
            <Link className="back-link" to="/studies">
                ← 목록으로
            </Link>

            <div className="detail-card">
                <div className="study-card-header">
                    <div className="badge-row">
                        <span className="category">{study.category}</span>
                        <span className="level-badge">{study.level}</span>
                        <span className="method-badge">{study.method}</span>
                    </div>

                    <button
                        type="button"
                        className={
                            isBookmarked(study.id)
                                ? "bookmark-button active"
                                : "bookmark-button"
                        }
                        onClick={() => toggleBookmark(study.id)}
                    >
                        {isBookmarked(study.id) ? "★" : "☆"}
                    </button>
                </div>

                <h2>{study.title}</h2>

                <div className="study-meta">
                    <span>작성자: {study.writer}</span>
                    <span>작성일: {study.createdAt}</span>
                    <span>
                        인원: {study.currentMember} / {study.maxMember}
                    </span>
                </div>

                <div className="member-progress detail-progress">
                    <div className="member-progress-top">
                        <span>모집 진행률</span>
                        <strong>{progressPercent}%</strong>
                    </div>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                <p className="detail-content">{study.content}</p>

                {application && (
                    <div className="application-info-box">
                        <strong>신청 상태</strong>
                        <span>
                            {application.status === "PENDING" && "승인 대기중"}
                            {application.status === "APPROVED" && "승인됨"}
                            {application.status === "REJECTED" && "거절됨"}
                        </span>
                    </div>
                )}

                <div className="detail-action-section">
                    <div className="user-action-box">
                        <h3>스터디 참여</h3>
                        <p>관심 있는 스터디에 신청하거나, 신청 후 스터디 공간에 입장할 수 있습니다.</p>

                        <div className="detail-actions">
                            {study.status === "CLOSED" ? (
                                <button className="disabled-button" disabled>
                                    모집 마감
                                </button>
                            ) : application ? (
                                <>
                                    <Link className="primary-button" to={`/chat/${study.id}`}>
                                        채팅방 입장
                                    </Link>

                                    <button className="secondary-button" onClick={handleCancelApplication}>
                                        신청 취소
                                    </button>
                                </>
                            ) : (
                                <button className="primary-button" onClick={handleApply}>
                                    신청하기
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="manage-action-box">
                        <div>
                            <h3>스터디 관리</h3>
                            <p>작성자는 모집글 정보를 수정하거나 삭제할 수 있습니다.</p>
                        </div>

                        <div className="detail-actions">
                            <Link className="secondary-button" to={`/studies/${study.id}/edit`}>
                                수정
                            </Link>

                            <button className="danger-button" onClick={handleDelete}>
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StudyDetailPage;