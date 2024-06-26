import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
} & React.ComponentPropsWithoutRef<"input">;

export const FormInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  ...props
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type FormInputPropsRef<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
} & React.ComponentPropsWithRef<"input">;

const FormInputRef = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  { control, name, label, ...props }: FormInputPropsRef<TFieldValues, TName>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} ref={ref} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormInputWithRef = React.forwardRef(FormInputRef);
