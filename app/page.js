"use client";

const API_URL =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=3dPq3sfQDvtiI55qOaQntzIG3L1iiMSN";

import styled from "styled-components";
import Table from "./components/table";
import Pagination from "./components/pagination";
import { useEffect, useState } from "react";
import Loading from "./components/loading";

// New York Times에서 API 요청으로 기사들을 가져오는 함수
async function getData(curPage) {
  const res = await fetch(API_URL + `&page=${curPage}`);
  const data = await res.json();
  return data;
}

// 컴포넌트가 다시 랜더링 되는 조건
// 1. props가 바뀔 때
// 2. state가 바뀔 때
// 3. 부모 컴포넌트가 리랜더링 될 때
// 4. forceUpdate가 호출될 때

// 컴포넌트 -> 내부 코드로 상태 관리, return으로 HTML 관리
export default function Home() {
  // 상태관리 부분
  // useState : 컴포넌트 내부에서 관리하는 변수
  // state가 바뀌면 다시 랜더링 -> 화면에 변화를 주기 위한 변수들
  // 컴포넌트 내부에 const a = 10 같이 변수를 선안하면, 컴포넌트가 불릴 때마다 변수를 새로 생성해서 사용
  // state의 경우 이미 존재하는 변수는 이어서 관리할 수 있게 해주기 때문에, 가급적 변수는 state로 관리해라
  const [articles, setArticles] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect : 컴포넌트가 랜더링 될 때 한 번 실행하는 함수
  useEffect(() => {
    setIsLoading(true);
    getData(curPage).then((data) => {
      setArticles(data.response.docs);
      setTotalPage(
        //Math.ceil(data.response.meta.hits / data.response.meta.offset)
        10
      );
      setIsLoading(false);
    });
  }, [curPage]);
  // useEffect의 두 번째 인자가 없으면 콜백 매번 실행
  // useEffect -> setState로 배열 설정 -> state가 바뀌니 다시 useEffect -> 다시 setState -> ...
  // useEffect의 두 번째 인자로 의존성 배열 추가 -> useEffect는 의존성 배열 내부값이 바뀔 때만 실행
  // 무한 루프 -> 반복해서 랜더링, 반복 요청 429 에러 발생

  return (
    // HTML 관리 부분
    <Container>
      <h1>New york Times</h1>
      <Table articles={articles} curPage={curPage} />
      <Pagination
        curPage={curPage}
        totalPage={totalPage}
        setCurPage={setCurPage}
      />
      {isLoading && <Loading />}
    </Container>
  );
}

const Container = styled.div`
  background: black;
  color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > h1 {
    font-size: 2.5rem;
  }
`;
