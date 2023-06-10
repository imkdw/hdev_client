import { Socket } from "net";
import { atom } from "recoil";
import { IChat } from "../types/chat";

/** 채팅 클라이언트 */
export const socketState = atom<null | Socket>({
  key: "socketState",
  default: null,
});

/** 채팅 목록 */
export const chatListState = atom<IChat[] | never[]>({
  key: "chatListState",
  default: [],
});
