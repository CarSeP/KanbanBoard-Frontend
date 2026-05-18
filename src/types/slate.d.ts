import type { BaseText, BaseElement } from "slate";

declare module "slate" {
  interface CustomTypes {
    Text: BaseText & { bold?: boolean; italic?: boolean; underline?: boolean };
    Element: BaseElement & { type: string };
  }
}
