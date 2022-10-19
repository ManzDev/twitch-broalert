import { shuffle } from "./shuffle.js";

const USERS_API = "http://localhost:9999/api/users";
const INFO_API = "http://localhost:9999/api/userinfo/";

export const chooseUser = async () => {
  const response = await fetch(USERS_API);
  const usersList = await response.json();
  const userIndex = Math.floor(Math.random() * usersList.length);
  const user = usersList[userIndex];
  return user;
};

export const getUserInfo = async (username) => {
  const response = await fetch(INFO_API + username);
  const data = await response.json();
  return data;
};
