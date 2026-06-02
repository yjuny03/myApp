// src/components/study/StudyFilter.jsx

function StudyFilter({
  keyword,
  setKeyword,
  category,
  setCategory,
  sort,
  setSort,
  categories,
}) {
  return (
    <div className="filter-box">
      <input
        type="text"
        placeholder="제목 또는 내용으로 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="latest">최신순</option>
        <option value="memberLow">인원 적은 순</option>
        <option value="memberHigh">인원 많은 순</option>
        <option value="recruiting">모집중 우선</option>
      </select>
    </div>
  );
}

export default StudyFilter;