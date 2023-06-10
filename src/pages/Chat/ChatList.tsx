import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { chatListState } from "../../recoil/chat";
import { loggedInUserState } from "../../recoil";

const StyledChatList = styled.ul`
  width: 100%;
  height: 80%;
  background-color: #535252;
  display: flex;
  flex-direction: column;
`;

const Chat = styled.li<{ isMe: boolean }>`
  width: 40%;
  height: 70px;
  margin: 10px 10px 0px 10px;
  display: flex;
  align-items: center;
  align-self: ${(props) => props.isMe && "flex-end"};
  justify-content: ${(props) => props.isMe && "flex-end"};
`;

const Profile = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 40%;
  border: 1px solid #dbdbdb;
`;

const ChatData = styled.div<{ isMe: boolean }>`
  width: 78%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
  margin-left: 15px;
`;

const ChatText = styled.p<{ isMe: boolean }>`
  width: auto;
  height: 50%;
  font-size: 18px;
  background-color: ${(props) => (props.isMe ? "yellow" : "white")};
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 0 10px 0 10px;
  white-space: nowrap;
`;

const Nickname = styled.p`
  font-size: 16px;
  color: white;
`;

const ChatList = () => {
  const chats = useRecoilValue(chatListState);
  const loggedInUser = useRecoilValue(loggedInUserState);

  return (
    <StyledChatList>
      {chats.map((chat) => (
        <Chat isMe={chat.nickname === loggedInUser.nickname}>
          {chat.nickname !== loggedInUser.nickname && <Profile src={chat.profileImg} />}
          <ChatData isMe={chat.nickname === loggedInUser.nickname}>
            {chat.nickname !== loggedInUser.nickname && <Nickname>{chat.nickname}</Nickname>}
            <ChatText isMe={chat.nickname === loggedInUser.nickname}>{chat.message}</ChatText>
          </ChatData>
        </Chat>
      ))}
    </StyledChatList>
  );
};

export default ChatList;
