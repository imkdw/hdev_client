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

const GoogleLogin = styled.a`
  color: blue;
  font-weight: bold;
`;

interface AuthPageProps {
  type: string;
}

const AuthPage = ({ type }: AuthPageProps) => {
  const setEnableMenu = useSetRecoilState(enableMenuState);

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
          <GoogleLogin
            href="https://accounts.google.com/o/oauth2/v2/auth?
                  scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&
                  response_type=token&
                  redirect_uri=http://localhost:3000&
                  client_id=410471175654-gu11onos1pgutokjciklfisb9ckv8t2d.apps.googleusercontent.com"
            target="_blank"
          >
            구글로그인(임시)
          </GoogleLogin>
          {type === "login" && <LoginForm />}
          {type === "register" && <RegisterForm />}
        </Form>
      </Content>
    </StyledAuthPage>
  );
};

export default AuthPage;
