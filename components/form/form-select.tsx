import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Select } from "@/components/custom/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  T extends string,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  options: T[];
} & React.ComponentPropsWithoutRef<"select">;

export const FormSelect = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  T extends string,
>({
  control,
  name,
  label,
  options,
  ...props
}: FormSelectProps<TFieldValues, TName, T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select {...field} {...props}>
              {options.map((option) => (
                <>
                  <option value="" hidden>
                    Select an option
                  </option>
                  <option key={option} value={option}>
                    {option}
                  </option>
                </>
              ))}
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
