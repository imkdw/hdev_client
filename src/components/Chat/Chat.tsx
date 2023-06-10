import styled from "styled-components";
import ChatForm from "../../pages/Chat/ChatForm";
import ChatList from "../../pages/Chat/ChatList";
import { useEffect } from "react";
import { socket } from "../../utils/Socket/socketio";
import { useSetRecoilState } from "recoil";
import { chatListState } from "../../recoil/chat";
import { IChat } from "../../types/chat";

const StyledChat = styled.div`
  height: 100%;
  flex: 6;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  width: 100%;
  min-height: 140px;
  border-bottom: 1px solid #e5e6e8;
  display: flex;
  align-items: center;
`;

const ChatSubject = styled.div`
  margin-left: 20px;
  font-size: 40px;
`;

const Chat = () => {
  const setChats = useSetRecoilState(chatListState);

  useEffect(() => {
    socket.connect();

    socket.on("recMessage", (data: IChat) => {
      setChats((prevState) => [...prevState, data]);
    });
  }, [setChats]);

  return (
    <StyledChat>
      <ChatHeader>
        <ChatSubject>채팅</ChatSubject>
      </ChatHeader>
      <ChatList />
      <ChatForm />
    </StyledChat>
  );
};

export default Chat;
