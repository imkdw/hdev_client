import { sha256 } from "js-sha256";
import { IParam } from "../../types/payments";

export function getTimestamp() {
  // Set the timezone
  const timezone = "Asia/Seoul";
  const date = new Date();
  const currentTime = date.getTime();
  const currentTimeInSeconds = Math.floor(currentTime / 1000);
  const currentTimeInMilliseconds = currentTime.toString().slice(-3).padStart(3, "0");

  // Pad the milliseconds value to always have 3 digits
  const milliseconds = currentTimeInMilliseconds.padStart(3, "0");

  return `${currentTimeInSeconds}${milliseconds}`;
}

export function makeHash(data: string) {
  return sha256(data);
}

export function makeSignature(signParam: IParam): string {
  const queryString = Object.entries(signParam)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const sign = sha256(queryString);
  console.log(queryString, sign);

  return sign;
}
