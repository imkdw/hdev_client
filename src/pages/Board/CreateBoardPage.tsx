import styled from "styled-components";
import CreateBoardForm from "../../components/Board/CreateBoard/CreateBoardForm";
import { Menu } from "../../components/Menu";
import { useRecoilValue } from "recoil";
import { enableMenuState } from "../../recoil";
import { v4 } from "uuid";
import { useMediaQuery } from "react-responsive";
import { MobileHeader } from "../../components/Mobile";

const StyledCreateBoardPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const CreateBoardPage = () => {
  const tempBoardId = v4();
  const isMobile = useMediaQuery({ maxWidth: "767px" });
  const enableSideMenu = useRecoilValue(enableMenuState);

  return (
    <StyledCreateBoardPage>
      {isMobile && <MobileHeader />}
      {!isMobile && <Menu />}
      {enableSideMenu && <Menu />}
      <CreateBoardForm tempBoardId={tempBoardId} />
    </StyledCreateBoardPage>
  );
};
export default CreateBoardPage;
