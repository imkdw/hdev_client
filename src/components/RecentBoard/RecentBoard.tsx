import styled from "styled-components";
import { useEffect, useState } from "react";
import { getRecentBoards } from "../../services/BoardService";
import RecentBoardBox from "./RecentBoardBox";

const StyledRecentBoard = styled.div`
  height: 100%;
  flex: 6;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 767px) {
    align-items: flex-start;
    height: auto;
    overflow-y: scroll;
  }
`;

const Wrapper = styled.div`
  width: 95%;
  height: 850px;
  display: flex;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    height: 1500px;
  }
`;

const SortationTitle = styled.div`
  width: 90%;
  height: 50px;
  background-color: #2c65ff;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;

const TitleText = styled.p`
  margin-left: 30px;
  font-size: 24px;
  color: white;
  letter-spacing: 5px;

  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

const NoContent = styled.p`
  color: #838383;
  font-size: 22px;
  margin-top: 20px;
`;

const Content = styled.ul`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 767px) {
    width: 100%;

    &:first-child {
      margin-top: 20px;
    }
  }
`;

const ContentItem = styled.li`
  width: 90%;
  height: 49%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface RecentBoardResponse {
  [key: string]: {
    boardId: string;
    title: string;
    createdAt: string;
    user: {
      nickname: string;
      profileImg: string;
    };
    view: {
      viewCnt: number;
    };
  }[];
}

const RecentBoard = () => {
  const [boards, setBoards] = useState<RecentBoardResponse>();

  useEffect(() => {
    const loadRecentBoard = async () => {
      try {
        const res = await getRecentBoards();
        setBoards(res.data);
      } catch (err: any) {}
    };

    loadRecentBoard();
  }, []);

  return (
    <StyledRecentBoard>
      <Wrapper>
        <Content>
          <ContentItem>
            <SortationTitle>
              <TitleText>공지사항</TitleText>
            </SortationTitle>
            {boards && boards["notice"].length !== 0 ? (
              <RecentBoardBox boardData={boards["notice"]} />
            ) : (
              <NoContent>최근 게시글이 없습니다</NoContent>
            )}
          </ContentItem>
          <ContentItem>
            <SortationTitle>
              <TitleText>질문답변</TitleText>
            </SortationTitle>
            {boards && boards["qna"].length !== 0 ? (
              <RecentBoardBox boardData={boards["qna"]} />
            ) : (
              <NoContent>최근 게시글이 없습니다</NoContent>
            )}
          </ContentItem>
        </Content>
        <Content>
          <ContentItem>
            <SortationTitle>
              <TitleText>지식공유</TitleText>
            </SortationTitle>
            {boards && boards["knowledge"].length !== 0 ? (
              <RecentBoardBox boardData={boards["knowledge"]} />
            ) : (
              <NoContent>최근 게시글이 없습니다</NoContent>
            )}
          </ContentItem>
          <ContentItem>
            <SortationTitle>
              <TitleText>인원모집</TitleText>
            </SortationTitle>
            {boards && boards["recruitment"].length !== 0 ? (
              <RecentBoardBox boardData={boards["recruitment"]} />
            ) : (
              <NoContent>최근 게시글이 없습니다</NoContent>
            )}
          </ContentItem>
        </Content>
      </Wrapper>
    </StyledRecentBoard>
  );
};
export default RecentBoard;
