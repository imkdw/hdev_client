import { ChangeEvent, useState, FormEvent } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoadingState, loggedInUserState } from "../../../recoil";
import { boardDetailState } from "../../../recoil/board";
import { createComment } from "../../../services";
import { getBoard } from "../../../services/BoardService";
import { ProfileImage } from "../../Common/User";

const StyledCreateComment = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const InputWrapper = styled.form`
  width: 94%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  @media screen and (max-width: 767px) {
    width: 82%;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid #b9b9b9;
  border-radius: 10px;
  resize: none;
  outline: none;
  padding: 10px;
  font-size: 18px;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background-color: #0090f9;
  color: white;
  font-size: 16px;
`;

const DisableSubmitButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background-color: #5fbcff;
  color: white;
  font-size: 16px;
  cursor: default;
`;

const CreateComment = () => {
  const loggedInUser = useRecoilValue(loggedInUserState);
  const [boardDetail, setBoardDetail] = useRecoilState(boardDetailState);

  const [comment, setComment] = useState("");
  const [isValidComment, setIsValidComment] = useState(false);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const setLoggedInUser = useSetRecoilState(loggedInUserState);

  const commentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setComment(value);

    if (value.length === 0 || value.length > 200) {
      setIsValidComment(false);
    } else {
      setIsValidComment(true);
    }
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loggedInUser.accessToken) {
      alert("로그인이 필요한 서비스 입니다.");
      return;
    }

    if (!isValidComment || comment.length === 0 || comment.length > 200) {
      alert("댓글은 1~200자 사이로 입력해주세요");
      return;
    }

    try {
      setIsLoading(true);
      const res = await createComment(boardDetail.boardId, comment, loggedInUser.accessToken);
      if (res.data.accessToken) {
        setLoggedInUser((prevState) => {
          return { ...prevState, accessToken: res.data.accessToken };
        });
      }

      alert("댓글 작성이 완료되었습니다.");
      setComment("");
      setIsValidComment(false);

      // 댓글 작성이후 api 호출해서 댓글 내용 최신화
      const boardRes = await getBoard(boardDetail.boardId);
      setBoardDetail(boardRes.data);
    } catch (err: any) {
      let errMessage = "서버 오류입니다. 다시 시도해주세요.";
      const { status, data } = err.response;
      switch (status) {
        case 400:
          switch (data.message) {
            case "invalid_comment":
              errMessage = "댓글 형식이 올바르지 않습니다.";
          }
          break;
        case 401:
          switch (data.message) {
            case "unauthorized_user":
              errMessage = "로그인이 만료되었습니다. 다시 로그인해주세요";
          }
      }

      alert(errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledCreateComment>
      <ProfileImage profileImg={loggedInUser.profileImg} userId={boardDetail.user.userId} />
      <InputWrapper onSubmit={submitHandler}>
        <Textarea placeholder="1~200자 사이로 입력해주세요" onChange={commentChangeHandler} value={comment} />
        {isValidComment ? (
          <SubmitButton type="submit">댓글 쓰기</SubmitButton>
        ) : (
          <DisableSubmitButton type="button" disabled>
            댓글 쓰기
          </DisableSubmitButton>
        )}
      </InputWrapper>
    </StyledCreateComment>
  );
};

export default CreateComment;
