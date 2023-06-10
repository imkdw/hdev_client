import { ChangeEvent, FormEvent, useState } from "react";

import styled from "styled-components";
import { socket } from "../../utils/Socket/socketio";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../recoil";

const StyledChatForm = styled.form`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 70%;
  resize: none;
  outline: none;
  border: none;
  padding: 10px 10px 0 10px;
  font-size: 20px;

  &::placeholder {
    color: #dbdbdb;
  }
`;

const Button = styled.button`
  width: 10%;
  height: 25%;
  background-color: #fee500;
  font-size: 14px;
  margin-right: 10px;
`;

const ChatForm = () => {
  const [message, setMessage] = useState("");
  const loggedInUser = useRecoilValue(loggedInUserState);
  const { nickname, profileImg } = loggedInUser;

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    socket.emit("sendMessage", {
      nickname,
      profileImg,
      message,
    });
  };

  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  return (
    <>
      <StyledChatForm onSubmit={submitHandler}>
        <Textarea placeholder="채팅을 입력해주세요" onChange={changeHandler} value={message} />
        <Button>전송</Button>
      </StyledChatForm>
    </>
  );
};

export default ChatForm;
