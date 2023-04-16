import styled from "styled-components";
import { Menu } from "../../components/Menu";
import { useRecoilState } from "recoil";
import { enableMenuState } from "../../recoil";
import { useMediaQuery } from "react-responsive";
import { MobileHeader } from "../../components/Mobile";
import { useEffect } from "react";
import { SearchResult } from "../../components/Search";
import { useLocation } from "react-router-dom";

const StyledSearchPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const SearchPage = () => {
  const isMobile = useMediaQuery({ maxWidth: "767px" });
  const location = useLocation();
  const searchText = new URLSearchParams(location.search).get("text") as string;
  const [enableMenu, setEnableMenu] = useRecoilState(enableMenuState);

  useEffect(() => {
    setEnableMenu(false);
  }, [setEnableMenu, searchText]);

  return (
    <StyledSearchPage>
      {!isMobile && <Menu />}
      {isMobile && <MobileHeader />}
      {enableMenu && <Menu />}
      <SearchResult searchText={searchText} />
    </StyledSearchPage>
  );
};

export default SearchPage;
