import { forwardRef } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";

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

export const toSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-") //replace space with "-"
    .replace(/[^\w-]+/g, ""); //replace multiple space with single space
};

type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
) => (props: P & React.RefAttributes<T>) => React.ReactElement | null;

export const fixedForwardRef = forwardRef as FixedForwardRef;
