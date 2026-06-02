// src/data/mockStudies.js

export const mockStudies = [
  {
    id: 1,
    title: "React 입문 스터디",
    content:
      "React 기본 문법, 컴포넌트, props, state, 라우팅까지 같이 공부하는 스터디입니다.",
    category: "React",
    level: "입문",
    method: "온라인",
    writer: "준영",
    maxMember: 5,
    currentMember: 2,
    status: "RECRUITING",
    createdAt: "2026-05-24",
  },
  {
    id: 2,
    title: "Spring Boot REST API 스터디",
    content:
      "Spring Boot로 REST API를 만들고 React와 axios로 연동하는 것을 목표로 합니다.",
    category: "Spring",
    level: "중급",
    method: "오프라인",
    writer: "민수",
    maxMember: 4,
    currentMember: 4,
    status: "CLOSED",
    createdAt: "2026-05-23",
  },
  {
    id: 3,
    title: "알고리즘 문제풀이 스터디",
    content:
      "백준, 프로그래머스 문제를 주 3회 풀고 풀이를 공유하는 스터디입니다.",
    category: "Algorithm",
    level: "초급",
    method: "온라인",
    writer: "서연",
    maxMember: 6,
    currentMember: 3,
    status: "RECRUITING",
    createdAt: "2026-05-22",
  },
  {
    id: 4,
    title: "DB 설계 기초 스터디",
    content:
      "ERD, 테이블 설계, 정규화, SQL 기초를 함께 공부하는 스터디입니다.",
    category: "DB",
    level: "입문",
    method: "온·오프라인",
    writer: "지훈",
    maxMember: 5,
    currentMember: 1,
    status: "RECRUITING",
    createdAt: "2026-05-21",
  },
];