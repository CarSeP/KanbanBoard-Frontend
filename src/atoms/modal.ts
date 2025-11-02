import { atom } from "jotai";
import type { Board } from "../interfaces/board.interface";

type Modal = "detail" | "delete" | "upsert" | "none";
type ModalData = Board | undefined;

export const modalAtom = atom<Modal>("none");
export const modalDataAtom = atom<Board | undefined>();

export const setModalAtom = atom(null, (_get, set, type: Modal) => {
  set(modalAtom, type);
});

export const setModalDataAtom = atom(null, (_get, set, data: ModalData) => {
  set(modalDataAtom, data);
});
