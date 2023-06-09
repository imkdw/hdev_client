import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Intro, LoginForm, RegisterForm, TabMenu } from "../../components/Auth";
import { Logo } from "../../components/Common";
import { enableMenuState } from "../../recoil";
import { useEffect } from "react";

const StyledAuthPage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #eef2f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthPageBar = styled.div`
  position: absolute;
  width: 30%;
  height: 100%;
  background-color: #799efb;
  left: 0;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Content = styled.div`
  width: 60%;
  height: 80%;
  border-radius: 15px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

  @media screen and (max-width: 767px) {
    width: 90%;
    height: 90%;
  }
`;

const Form = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 90%;
  }
`;

const GoogleLogin = styled.button`
  color: blue;
  font-weight: bold;
`;

const NaverLogin = styled.button`
  color: green;
  font-weight: bold;
`;

interface AuthPageProps {
  type: string;
}

const AuthPage = ({ type }: AuthPageProps) => {
  const setEnableMenu = useSetRecoilState(enableMenuState);

  const googleHandler = () => {
    const oAuthEndpoint = "https://accounts.google.com/o/oauth2/auth";
    const clientId = "410471175654-gu11onos1pgutokjciklfisb9ckv8t2d.apps.googleusercontent.com";
    const redirectUri = "http://localhost:3000/auth/google";
    const responseType = "token";
    const scope = `https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

    window.location.href = `${oAuthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  };

  const naverHandler = () => {
    const oAuthEndpoint = "https://nid.naver.com/oauth2.0/token";
    const clientId = "w6DGCoVjEAuTQyLcCBQa";
    const clientSecret = "temp";
    const redirectUri = "http://localhost:3000/auth/naver";
    const responseType = "token";
    const state = "hdev";
    const grantType = "authorization_code";

    window.location.href = `${oAuthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&reponse_type=${responseType}&state=${state}&grant_type=${grantType}&client_secret=${clientSecret}`;
  };

  useEffect(() => {
    setEnableMenu(false);
  }, [setEnableMenu]);

  return (
    <StyledAuthPage>
      <AuthPageBar />
      <Content>
        <Intro />
        <Form>
          <TabMenu type={type} />
          <Logo width={200} height={100} />
          <GoogleLogin onClick={googleHandler}>구글로그인(임시)</GoogleLogin>
          <NaverLogin onClick={naverHandler}>네이버로그인(임시)</NaverLogin>
          {type === "login" && <LoginForm />}
          {type === "register" && <RegisterForm />}
        </Form>
      </Content>
    </StyledAuthPage>
  );
};

export default AuthPage;
