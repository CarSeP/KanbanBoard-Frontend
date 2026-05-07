import { atom } from "jotai";
import type { ActionValue } from "../interfaces/action.interface";

type ActionData = ActionValue | undefined;
type Action =
  | "upsertColumn"
  | "deleteColumn"
  | "upsertCard"
  | "deleteCard"
  | "detailCard"
  | "none";

export const actionAtom = atom<Action>("none");
export const actionDataAtom = atom<ActionData>(undefined);

export const setActionAtom = atom(null, (_get, set, type: Action) => {
  set(actionAtom, type);
});

export const setActionDataAtom = atom(null, (_get, set, data: ActionData) => {
  set(actionDataAtom, data);
});
