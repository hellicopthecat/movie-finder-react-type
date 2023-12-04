import {atom} from "recoil";

export const isDark = atom({
  key: "isDark",
  default: true,
});

export const sliderIndex = atom({
  key: "sliderIndex",
  default: 0,
});

export const toggleLeaving = atom({
  key: "toggleLeaving",
  default: false,
});
