import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledProfile = styled(Link)`
  width: 50px;
  height: 50px;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
`;

interface ProfileImageProps {
  profileImg: string;
  userId: string;
}

const ProfileImage = ({ profileImg, userId }: ProfileImageProps) => {
  return (
    <StyledProfile to={`/users/${userId}`}>
      <ProfileImg src={profileImg || "https://s3.ap-northeast-2.amazonaws.com/dongwoo.personal/2143305.png"} />
    </StyledProfile>
  );
};

export default ProfileImage;
