"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { type actionFunction } from "@/utils/types";

interface FormContainerProps {
  action: actionFunction;
  children: React.ReactNode;
}

const initialState = {
  message: "",
};

const FormContainer: React.FC<FormContainerProps> = ({ action, children }) => {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        description: state.message,
      });
    }
  }, [state.message, toast]);
  return <form action={formAction}>{children}</form>;
};

export default FormContainer;