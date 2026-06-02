// src/pages/ChatRoomPage.jsx

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext.js";

function ChatRoomPage() {
  const { roomId } = useParams();
  const studyId = Number(roomId);

  const { studies, getApplicationByStudyId, getMessagesByStudyId, sendMessage } =
    useAppContext();

  const [message, setMessage] = useState("");

  const study = studies.find((item) => item.id === studyId);
  const application = getApplicationByStudyId(studyId);
  const messages = getMessagesByStudyId(studyId);

  if (!study) {
    return (
      <section>
        <h2>채팅방을 찾을 수 없습니다.</h2>
        <Link to="/chat">채팅방 목록으로 돌아가기</Link>
      </section>
    );
  }

  if (!application) {
    return (
      <section>
        <h2>채팅방에 입장할 수 없습니다.</h2>
        <p>스터디를 먼저 신청해야 채팅방을 사용할 수 있습니다.</p>
        <Link className="primary-button" to={`/studies/${study.id}`}>
          스터디 상세로 이동
        </Link>
      </section>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      return;
    }

    sendMessage(studyId, message.trim());
    setMessage("");
  };

  return (
    <section className="chat-page">
      <Link className="back-link" to="/chat">
        ← 채팅방 목록으로
      </Link>

      <div className="chat-layout">
        <aside className="chat-side">
          <div className="badge-row">
            <span className="category">{study.category}</span>
            <span className="level-badge">{study.level}</span>
          </div>

          <h2>{study.title}</h2>

          <p>{study.content}</p>

          <div className="study-meta">
            <span>작성자: {study.writer}</span>
            <span>
              인원: {study.currentMember} / {study.maxMember}
            </span>
          </div>

          <Link className="secondary-button" to={`/studies/${study.id}`}>
            스터디 상세 보기
          </Link>
        </aside>

        <div className="chat-box">
          <div className="chat-header">
            <strong>{study.title}</strong>
            <span>{messages.length}개 메시지</span>
          </div>

          <div className="message-list">
            {messages.length === 0 ? (
              <div className="empty-message">
                아직 메시지가 없습니다. 첫 메시지를 보내보세요.
              </div>
            ) : (
              messages.map((item) => (
                <div
                  className={
                    item.isMine ? "message-row mine" : "message-row other"
                  }
                  key={item.id}
                >
                  <div className="message-bubble">
                    <div className="message-meta">
                      <strong>{item.sender}</strong>
                      <span>{item.createdAt}</span>
                    </div>

                    <p>{item.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <form className="message-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="메시지를 입력하세요."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="primary-button" type="submit">
              전송
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ChatRoomPage;