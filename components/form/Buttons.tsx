"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface SubmitButtonProps {
  className?: string;
  text?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  className = "",
  text = "submit",
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`capitalize ${className}`}
      size="lg"
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
};
