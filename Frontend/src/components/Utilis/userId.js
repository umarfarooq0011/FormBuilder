
import { uid } from './fieldConfig';

const USER_ID_KEY = 'formForgeUserId';

export const getUserId = () => {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = `user_${uid()}`; // Create a new unique ID
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
};