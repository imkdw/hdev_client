import { io } from "socket.io-client";

const serverUrl = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://api.hdev.site:5000";
export const socket = io(serverUrl, { transports: ["websocket"] });
