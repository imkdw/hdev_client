import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { CloseIcon } from "../../assets/icon";
import { enableMenuState, loggedInUserState } from "../../recoil";
import MenuLogo from "./MenuLogo";
import MenuSearch from "./MenuSearch";
import MenuLink from "./MenuLink";
import MenuUtil from "./MenuUtil";
import axios from "axios";

const StyledMenu = styled.div`
  flex: 1.5;
  min-width: 350px;
  height: 100%;
  background-color: #f8f8f9;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e6e8;
  align-items: center;
  position: relative;
  z-index: 998;

  @keyframes loadEffect {
    0% {
      opacity: 0;
      transform: translateX(-30px);
    }
    50% {
      opacity: 0.5;
      transform: translateX(30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
    position: absolute;
    max-width: initial;
    z-index: 1;
    animation: 0.6s ease-in-out loadEffect;
  }
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const Menu = () => {
  const isMobile = useMediaQuery({ maxWidth: "767px" });
  const setEnableMenu = useSetRecoilState(enableMenuState);
  const loggedInUser = useRecoilValue(loggedInUserState);

  /** 모바일환경 사이드메뉴 비활성화 */
  const closeMenuHandler = () => {
    setEnableMenu((prevState) => !prevState);
    document.body.style.overflow = "scroll";
  };

  // TODO: 테스트용 API 호출 핸들러
  const testHandler = async (isToken: boolean) => {
    const testUrl = "http://localhost:5000/test";
    if (isToken) {
      await axios.get(testUrl, {
        headers: {
          Authorization: `Bearer ${loggedInUser.accessToken}`,
        },
      });
      return;
    }

    await axios.get(testUrl);
  };

  return (
    <StyledMenu>
      {isMobile && (
        <CloseButton onClick={closeMenuHandler}>
          <CloseIcon />
        </CloseButton>
      )}
      <MenuLogo />
      <MenuSearch />
      <MenuLink />
      <MenuUtil />
      <button onClick={() => testHandler(true)}>test(토큰O)</button>
      <button onClick={() => testHandler(false)}>test(토큰X)</button>
    </StyledMenu>
  );
};

export default Menu;
