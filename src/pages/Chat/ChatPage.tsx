import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { enableMenuState, loggedInUserState } from "../../recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MobileHeader } from "../../components/Mobile";
import { Menu } from "../../components/Menu";
import { useMediaQuery } from "react-responsive";
import Chat from "../../components/Chat/Chat";

const StyledChat = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const ChatPage = () => {
  const loggedInUser = useRecoilValue(loggedInUserState);
  const navigator = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: "767px" });
  const enableSideMenu = useRecoilValue(enableMenuState);

  useEffect(() => {
    if (!loggedInUser.accessToken) {
      alert("로그인이 필요합니다.");
      navigator(-1);
      return;
    }
  }, [loggedInUser, navigator]);

  return (
    <StyledChat>
      {isMobile && <MobileHeader />}
      {!isMobile && <Menu />}
      {enableSideMenu && <Menu />}
      <Chat />
    </StyledChat>
  );
};

export default ChatPage;
