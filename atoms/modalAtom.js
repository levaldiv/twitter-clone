import { atom } from "recoil";

// This is avail globally into any component
export const modalState = atom({
  key: "modalState",
  default: false,
});

export const postIdState = atom({
  key: "postIdState",
  default: "",
});
