import styled from "styled-components";

export default function Pagination(props) {
  const onClickHandler = (idx) => {
    props.setCurPage(idx + 1);
  };

  return (
    <Container>
      {new Array(props.totalPage).fill(0).map((_, idx) => (
        <div
          onClick={() => onClickHandler(idx)}
          key={idx}
          className={props.curPage - 1 === idx ? "on" : ""}
        >
          {idx + 1}
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  height: 100px;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 4px solid #565656;
    color: #aeaeae;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &.on {
      border: 4px solid #fff;
      color: #fff;
    }
  }
`;
