import { selector } from "recoil";
import { userState } from "../atoms/userAtom";

export const userselector = selector({
  key: "userSelector",
  get: ({ get }) => {
    return get(userState);
  },
});
