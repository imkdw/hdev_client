import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { googleAuth } from "../../services/AuthService";

const GoogleAuth = () => {
  const locationHash = useLocation().hash;

  useEffect(() => {
    const auth = async () => {
      const accessTokenRegex = /access_token=([^&]+)/;
      const match = locationHash.match(accessTokenRegex);
      const accessToken = match && match[1];

      if (accessToken) {
        const res = await googleAuth(accessToken);
        console.log(res.data);
      }
    };

    auth();
  }, [locationHash]);

  return <div></div>;
};

export default GoogleAuth;
