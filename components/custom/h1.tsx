import { cn } from "@/lib/utils";

interface H1Props extends React.ComponentPropsWithoutRef<"h1"> {}

export const H1 = ({ className, ...props }: H1Props) => {
  return (
    <h1
      className={cn(
        "text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
      {...props}
    >
      {props.children}
    </h1>
  );
};
