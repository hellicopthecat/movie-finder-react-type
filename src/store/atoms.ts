import {atom, selector} from "recoil";

export const isDark = atom({
  key: "isDark",
  default: true,
});
//nowPlay movie & tv
export const nowMoviePlay = atom({
  key: "nowMoviePlay",
  default: 0,
});
export const nowMoviePlayToggle = atom({
  key: "nowMoviePlayToggle",
  default: false,
});
export const onAirTv = atom({
  key: "onAirTv",
  default: 0,
});
export const onAirTvToggle = atom({
  key: "onAirTvToggle",
  default: false,
});
export const airingToday = atom({
  key: "airingToday",
  default: 0,
});
export const airingTodayToggle = atom({
  key: "airingTodayToggle",
  default: false,
});
export const direction = atom({
  key: "direction",
  default: true,
});
export const topRateMovieIndex = atom({
  key: "topRateMovieIndex",
  default: 0,
});
export const topRateMovieToggle = atom({
  key: "topRateToggle",
  default: false,
});
export const topTvIndex = atom({
  key: "topRateTvIndex",
  default: 0,
});
export const topTvToggle = atom({
  key: "topRateTvToggle",
  default: false,
});
export const searchText = atom({
  key: "searchText",
  default: "",
});
