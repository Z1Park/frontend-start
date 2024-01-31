import styled from "styled-components";

// index, title, link, date

export default function Table(props) {
  // props는 넘어오는 모든 인자를 담은 객체
  return (
    <Container>
      <Thead>
        <div>Index</div>
        <div>Title</div>
        <div>Link</div>
        <div>Date</div>
      </Thead>
      <Tbody>
        {props.articles.map((article, idx) => (
          <Row key={idx}>
            <div>{(props.curPage - 1) * 10 + idx + 1}</div>
            <div title={article.headline.main}>{article.headline.main}</div>
            <div>
              <a href={article.web_url} target="_blank">
                Link
              </a>
            </div>
            <div>{new Date(article.pub_date).toLocaleDateString()}</div>
          </Row>
        ))}
      </Tbody>
    </Container>
  );
}

const Row = styled.div`
  width: 100%;
  height: 10%;
  background: purple;
  box-sizing: border-box;
  border-bottom: 2px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  // & >  자기 바로 밑에 있는 자식
  & > div:nth-of-type(1) {
    width: 5%;
  }
  & > div:nth-of-type(2) {
    width: 60%;
    text-align: left;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & > div:nth-of-type(3) {
    width: 5%;
  }
  & > div:nth-of-type(4) {
    width: 20%;
  }

  // &  전체 a 태그 자식
  & a {
    background: black;
    color: white;
    padding: 6px 8px;
    border-radius: 10px;
    text-decoration: none;
    transition: 0.5s;

    // 호버 추가
    &:hover {
      background: black;
    }
  }
`;

const Tbody = styled.div`
  flex: 1;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Thead = styled.div`
  width: 100%;
  height: 60px;
  background: tomato;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  & > div:nth-of-type(1) {
    width: 5%;
  }
  & > div:nth-of-type(2) {
    width: 60%;
  }
  & > div:nth-of-type(3) {
    width: 5%;
  }
  & > div:nth-of-type(4) {
    width: 20%;
  }
`;

const Container = styled.div`
  width: 80%;
  height: 80%;
  background: gray;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
`;
