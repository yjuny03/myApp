// src/routes/AppRouter.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "../context/AppContext";
import Header from "../components/common/Header";
import HomePage from "../pages/HomePage";
import StudyListPage from "../pages/StudyListPage";
import StudyDetailPage from "../pages/StudyDetailPage";
import StudyCreatePage from "../pages/StudyCreatePage";
import StudyEditPage from "../pages/StudyEditPage";
import BookmarkPage from "../pages/BookmarkPage";
import ApplicationPage from "../pages/ApplicationPage";
import ChatRoomListPage from "../pages/ChatRoomListPage";
import ChatRoomPage from "../pages/ChatRoomPage";
import ToastContainer from "../components/common/ToastContainer";
import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Header />
                <ToastContainer />

                <main className="main">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/studies" element={<StudyListPage />} />
                        <Route path="/studies/new" element={<StudyCreatePage />} />
                        <Route path="/studies/:studyId" element={<StudyDetailPage />} />
                        <Route path="/studies/:studyId/edit" element={<StudyEditPage />} />
                        <Route path="/applications" element={<ApplicationPage />} />
                        <Route path="/bookmarks" element={<BookmarkPage />} />
                        <Route path="/chat" element={<ChatRoomListPage />} />
                        <Route path="/chat/:roomId" element={<ChatRoomPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </AppProvider>
    );
}

export default AppRouter;