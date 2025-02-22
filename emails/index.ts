import fs from "fs";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export const globalHTMLTemplate = fs
  .readFileSync(`${process.cwd()}/emails/global.html`, "utf8")
  .toString()
  .replace(/\$__APP_URL__/g, NEXT_PUBLIC_APP_URL)
  .replace(/\$__CURRENT_YEAR__/g, new Date().getFullYear().toString());

export * from "./sections";
