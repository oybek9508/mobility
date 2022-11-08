import { atom } from "jotai";

// isCompletedStamp1 (도장 1차 - 캔 글라스 수령 완료여부)
export const StampInfo = atom({
  isCompletedStamp1: false,
  isCompletedStamp2: false,
});

export const Stamp1 = atom({
  data: undefined,
});

export const Stamp2 = atom({
  data: undefined,
});
