// src/pages/StudyListPage.jsx

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import StudyCard from "../components/study/StudyCard";
import StudyFilter from "../components/study/StudyFilter";

function StudyListPage() {
  const { studies, toggleBookmark, isBookmarked } = useAppContext();

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("전체");
  const [sort, setSort] = useState("latest");

  const categories = useMemo(() => {
    const uniqueCategories = studies.map((study) => study.category);
    return ["전체", ...new Set(uniqueCategories)];
  }, [studies]);

  const filteredStudies = useMemo(() => {
    const result = studies.filter((study) => {
      const lowerKeyword = keyword.toLowerCase();

      const matchKeyword =
        study.title.toLowerCase().includes(lowerKeyword) ||
        study.content.toLowerCase().includes(lowerKeyword);

      const matchCategory = category === "전체" || study.category === category;

      return matchKeyword && matchCategory;
    });

    if (sort === "memberLow") {
      return [...result].sort((a, b) => a.currentMember - b.currentMember);
    }

    if (sort === "memberHigh") {
      return [...result].sort((a, b) => b.currentMember - a.currentMember);
    }

    if (sort === "recruiting") {
      return [...result].sort((a, b) => {
        if (a.status === b.status) return 0;
        return a.status === "RECRUITING" ? -1 : 1;
      });
    }

    return [...result].sort((a, b) => b.id - a.id);
  }, [studies, keyword, category, sort]);

  return (
    <section>
      <div className="page-title-row">
        <div>
          <h2>스터디 모집</h2>
          <p>참여하고 싶은 스터디를 찾아보세요.</p>
        </div>

        <Link className="primary-button" to="/studies/new">
          스터디 만들기
        </Link>
      </div>

      <StudyFilter
        keyword={keyword}
        setKeyword={setKeyword}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        categories={categories}
      />

      {filteredStudies.length === 0 ? (
        <div className="empty-box">검색 결과가 없습니다.</div>
      ) : (
        <div className="study-list">
          {filteredStudies.map((study) => (
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

export default StudyListPage;