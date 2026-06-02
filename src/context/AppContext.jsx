// src/context/AppContext.jsx

import { createContext, useEffect, useState } from "react";
import { mockStudies } from "../data/mockStudies";

export const AppContext = createContext(null);

const STORAGE_KEYS = {
    STUDIES: "study-chat-studies",
    BOOKMARKS: "study-chat-bookmarks",
    APPLICATIONS: "study-chat-applications",
    MESSAGES: "study-chat-messages",
    THEME: "study-chat-theme",
};

function loadFromStorage(key, defaultValue) {
    try {
        const savedData = localStorage.getItem(key);

        if (!savedData) {
            return defaultValue;
        }

        return JSON.parse(savedData);
    } catch (error) {
        console.error("localStorage 데이터를 불러오는 중 오류 발생:", error);
        return defaultValue;
    }
}

function AppProvider({ children }) {
    const [studies, setStudies] = useState(() =>
        loadFromStorage(STORAGE_KEYS.STUDIES, mockStudies)
    );

    const [bookmarks, setBookmarks] = useState(() =>
        loadFromStorage(STORAGE_KEYS.BOOKMARKS, [])
    );

    const [applications, setApplications] = useState(() =>
        loadFromStorage(STORAGE_KEYS.APPLICATIONS, [])
    );

    const [messages, setMessages] = useState(() =>
        loadFromStorage(STORAGE_KEYS.MESSAGES, {})
    );

    const [theme, setTheme] = useState(() =>
        loadFromStorage(STORAGE_KEYS.THEME, "light")
    );

    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.STUDIES, JSON.stringify(studies));
    }, [studies]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    }, [bookmarks]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    }, [applications]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }, [messages]);

    const addStudy = (newStudy) => {
        setStudies((prevStudies) => [newStudy, ...prevStudies]);
    };

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme));

        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [theme]);

    const deleteStudy = (studyId) => {
        setStudies((prevStudies) =>
            prevStudies.filter((study) => study.id !== studyId)
        );

        setBookmarks((prevBookmarks) =>
            prevBookmarks.filter((bookmarkId) => bookmarkId !== studyId)
        );

        setApplications((prevApplications) =>
            prevApplications.filter((application) => application.studyId !== studyId)
        );

        setMessages((prevMessages) => {
            const copiedMessages = { ...prevMessages };
            delete copiedMessages[studyId];
            return copiedMessages;
        });
    };

    const updateStudy = (updatedStudy) => {
        setStudies((prevStudies) =>
            prevStudies.map((study) =>
                study.id === updatedStudy.id ? updatedStudy : study
            )
        );
    };

    const toggleBookmark = (studyId) => {
        setBookmarks((prevBookmarks) => {
            if (prevBookmarks.includes(studyId)) {
                return prevBookmarks.filter((bookmarkId) => bookmarkId !== studyId);
            }

            return [...prevBookmarks, studyId];
        });
    };

    const isBookmarked = (studyId) => {
        return bookmarks.includes(studyId);
    };

    const applyStudy = (studyId) => {
        const alreadyApplied = applications.some(
            (application) => application.studyId === studyId
        );

        if (alreadyApplied) {
            return;
        }

        const newApplication = {
            id: Date.now(),
            studyId,
            applicantName: "준영",
            message: "스터디에 참여하고 싶습니다.",
            status: "PENDING",
            createdAt: new Date().toISOString().slice(0, 10),
        };

        setApplications((prevApplications) => [
            newApplication,
            ...prevApplications,
        ]);
    };

    const cancelApplication = (studyId) => {
        setApplications((prevApplications) =>
            prevApplications.filter((application) => application.studyId !== studyId)
        );
    };

    const getApplicationByStudyId = (studyId) => {
        return applications.find((application) => application.studyId === studyId);
    };

    const sendMessage = (studyId, content) => {
        const newMessage = {
            id: Date.now(),
            studyId,
            sender: "준영",
            content,
            createdAt: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            isMine: true,
        };

        setMessages((prevMessages) => {
            const roomMessages = prevMessages[studyId] || [];

            return {
                ...prevMessages,
                [studyId]: [...roomMessages, newMessage],
            };
        });
    };

    const getMessagesByStudyId = (studyId) => {
        return messages[studyId] || [];
    };

    const getChatRooms = () => {
        return applications
            .map((application) => {
                const study = studies.find((item) => item.id === application.studyId);

                if (!study) {
                    return null;
                }

                const roomMessages = messages[study.id] || [];
                const lastMessage = roomMessages[roomMessages.length - 1];

                return {
                    roomId: study.id,
                    study,
                    application,
                    lastMessage,
                    messageCount: roomMessages.length,
                };
            })
            .filter(Boolean);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const showToast = (message, type = "success") => {
        const newToast = {
            id: Date.now(),
            message,
            type,
        };

        setToasts((prevToasts) => [...prevToasts, newToast]);

        setTimeout(() => {
            setToasts((prevToasts) =>
                prevToasts.filter((toast) => toast.id !== newToast.id)
            );
        }, 2500);
    };

    const removeToast = (toastId) => {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== toastId)
        );
    };

    const resetData = () => {
        setStudies(mockStudies);
        setBookmarks([]);
        setApplications([]);
        setMessages({});
        setTheme("light");
    };

    const value = {
        studies,
        bookmarks,
        applications,
        messages,
        theme,
        toasts,
        addStudy,
        deleteStudy,
        updateStudy,
        toggleBookmark,
        isBookmarked,
        applyStudy,
        cancelApplication,
        getApplicationByStudyId,
        sendMessage,
        getMessagesByStudyId,
        getChatRooms,
        toggleTheme,
        showToast,
        removeToast,
        resetData,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;