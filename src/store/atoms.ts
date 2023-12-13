import {atom} from "recoil";

export const isDark = atom({
  key: "isDark",
  default: true,
});
export const direction = atom({
  key: "direction",
  default: true,
});
export const topRateMovieIndex = atom({
  key: "topRateMovieIndex",
  default: 0,
});
export const topRateToggle = atom({
  key: "topRateToggle",
  default: false,
});
