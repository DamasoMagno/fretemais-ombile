import { FieldError } from "react-hook-form";
import { Message } from "./styles";

export function Error(error: FieldError) {
  return error && <Message>{error.message}</Message>;
}
