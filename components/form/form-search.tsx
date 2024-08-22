import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { cn, fixedForwardRef } from "@/lib/utils";
import { FormField, FormItem } from "@/components/ui/form";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props<
  T extends FieldValues,
  P extends FieldPath<T>,
  K extends Record<string, any>,
> = {
  control: Control<T>;
  name: P;
  label: string;
  lists: K[];
  order: Array<keyof K>;
} & React.ComponentPropsWithoutRef<"input">;

const getValues = <T extends Record<string, any>>(
  obj: T,
  order: Array<keyof T>,
) => {
  let name = [];
  for (const x of order) {
    name.push(obj[x]);
  }
  return name.join(", ");
};

export const FormSearch = fixedForwardRef(
  <
    T extends FieldValues,
    P extends FieldPath<T>,
    K extends Record<string, any>,
  >(
    { control, name, label, lists, order, ...props }: Props<T, P, K>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const [searchInput, setSearchInput] = React.useState("");
    const [hasFocus, setHasFocus] = React.useState(false);

    const filteredItem = React.useMemo(() => {
      if (!searchInput) return [];

      const searchWords = searchInput.trim().split(/ +/);
      const re = searchWords.map((i) => new RegExp(`${i}`, "i"));

      return lists
        .map((item) => getValues(item, order))
        .filter((searchKey) => re.every((r) => searchKey.match(r) !== null))
        .slice(0, 5);
    }, [searchInput]);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  ref={ref}
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => setHasFocus(true)}
                  onBlur={() => setHasFocus(false)}
                  autoComplete="off"
                  {...props}
                />
                {searchInput && hasFocus && (
                  <div
                    className={cn(
                      "absolute z-50 mt-2 p-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md",
                      "text-sm outline-none",
                    )}
                  >
                    {!filteredItem.length && <p>No results found</p>}
                    {filteredItem.map((item) => (
                      <button
                        key={item}
                        className="w-full rounded-md text-start hover:bg-accent hover:text-accent-foreground p-2"
                        onMouseDown={() => {
                          field.onChange(item);
                          setSearchInput(item);
                          setHasFocus(false);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  },
);
