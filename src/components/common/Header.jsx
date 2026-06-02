// src/components/common/Header.jsx

import { Link, NavLink } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext.js";

function Header() {
    const {
        bookmarks,
        applications,
        getChatRooms,
        theme,
        toggleTheme,
        resetData,
    } = useAppContext();

    const chatRooms = getChatRooms();

    return (
        <header className="header">
            <Link to="/" className="logo">
                StudyChat
            </Link>

            <nav className="nav">
                <NavLink to="/">홈</NavLink>

                <NavLink to="/studies">스터디 모집</NavLink>

                <NavLink to="/applications">
                    신청 내역
                    {applications.length > 0 && (
                        <span className="nav-badge">{applications.length}</span>
                    )}
                </NavLink>

                <NavLink to="/chat">
                    채팅
                    {chatRooms.length > 0 && (
                        <span className="nav-badge">{chatRooms.length}</span>
                    )}
                </NavLink>

                <NavLink to="/bookmarks">
                    북마크
                    {bookmarks.length > 0 && (
                        <span className="nav-badge">{bookmarks.length}</span>
                    )}
                </NavLink>
            </nav>
            <div className="header-actions">
                <button className="theme-button" onClick={toggleTheme}>
                    {theme === "dark" ? "☀️ 라이트" : "🌙 다크"}
                </button>

                <button className="text-button" onClick={resetData}>
                    초기화
                </button>
            </div>
        </header>
    );
}

export default Header;