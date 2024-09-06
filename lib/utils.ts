import { forwardRef } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(amount);
};

export const relativeDate = (from: Date) => {
  return formatDistanceToNowStrict(from, { addSuffix: true });
};

const cleanStr = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-") //replace space with "-"
    .replace(/[^\w-]+/g, ""); //replace multiple space with single space
};

export const toSlug = (str: string) => {
  return `${cleanStr(str)}-${nanoid(10)}`;
};

export const storeCompanyLogo = async (file: File, str: string) => {
  await fs.mkdir("public/downloads/logo", { recursive: true });
  const logoPath = `/downloads/logo/${cleanStr(str)}-${nanoid(10)}${path.extname(file.name)}`;
  await fs.writeFile(logoPath, Buffer.from(await file.arrayBuffer()));
  return logoPath;
};

type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
) => (props: P & React.RefAttributes<T>) => React.ReactElement | null;

export const fixedForwardRef = forwardRef as FixedForwardRef;
