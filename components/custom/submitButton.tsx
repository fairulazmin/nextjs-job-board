"use client";

import { useFormStatus } from "react-dom";
import { LoadingButton } from "./loadingButton";

interface FormSubmitButton extends React.ComponentPropsWithoutRef<"button"> {}

export const FormSubmitButton = (props: FormSubmitButton) => {
  const { pending } = useFormStatus();

  return <LoadingButton {...props} type="submit" loading={pending} />;
};
