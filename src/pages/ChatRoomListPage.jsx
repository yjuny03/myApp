// src/pages/ChatRoomListPage.jsx

import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext.js";

function ChatRoomListPage() {
  const { getChatRooms } = useAppContext();

  const chatRooms = getChatRooms();

  return (
    <section>
      <div className="page-title-row">
        <div>
          <h2>채팅방</h2>
          <p>신청한 스터디의 채팅방에 입장할 수 있습니다.</p>
        </div>

        <Link className="primary-button" to="/studies">
          스터디 찾기
        </Link>
      </div>

      {chatRooms.length === 0 ? (
        <div className="empty-box">
          아직 참여 중인 채팅방이 없습니다.
          <br />
          스터디를 신청하면 채팅방이 생성됩니다.
        </div>
      ) : (
        <div className="chat-room-list">
          {chatRooms.map((room) => (
            <Link
              className="chat-room-card"
              to={`/chat/${room.roomId}`}
              key={room.roomId}
            >
              <div>
                <div className="badge-row">
                  <span className="category">{room.study.category}</span>
                  <span className="level-badge">{room.study.level}</span>
                </div>

                <h3>{room.study.title}</h3>

                <p>
                  {room.lastMessage
                    ? room.lastMessage.content
                    : "아직 메시지가 없습니다."}
                </p>
              </div>

              <div className="chat-room-meta">
                <span>{room.messageCount}개 메시지</span>
                <strong>입장하기 →</strong>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default ChatRoomListPage;