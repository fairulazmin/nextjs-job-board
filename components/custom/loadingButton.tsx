"use client";

import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  loading: boolean;
}

export const LoadingButton = ({
  children,
  loading,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      <span className="flex items-center justify-center gap-1">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  );
};
