import { api } from "../utils/Common";
import { token } from "./AuthService";

export const createComment = async (boardId: string, comment: string, accessToken: string) => {
  try {
    return await api.post(
      "/comments",
      { boardId, comment },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (err: any) {
    console.log(err);
    if (err.response.status === 401) {
      const tokenRes = await token();
      const res = await api.post(
        "/comments",
        { boardId, comment },
        {
          headers: {
            Authorization: `Bearer ${tokenRes.data.accessToken}`,
          },
        }
      );
      res.data.accessToken = tokenRes.data.accessToken;
      return res;
    }

    throw err;
  }
};

export const removeComment = async (commentId: number, accessToken: string) => {
  try {
    return await api.delete(`/comments/${commentId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
  } catch (err: any) {
    if (err.response.status === 401) {
      const tokenRes = await token();
      const res = await api.delete(`/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${tokenRes.data.accessToken}` },
      });
      res.data.accessToken = tokenRes.data.accessToken;
      return res;
    }

    throw err;
  }
};

export const updateComment = async (commentId: number, updatedComment: string, accessToken: string) => {
  try {
    return await api.patch(
      `/comments/${commentId}`,
      { comment: updatedComment },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (err: any) {
    if (err.response.status === 401) {
      const tokenRes = await token();
      const res = await api.patch(
        `/comments/${commentId}`,
        { comment: updatedComment },
        {
          headers: {
            Authorization: `Bearer ${tokenRes.data.accessToken}`,
          },
        }
      );
      res.data.accessToken = tokenRes.data.accessToken;
      return res;
    }

    throw err;
  }
};
