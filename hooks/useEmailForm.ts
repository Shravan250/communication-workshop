import { EditorState } from "lexical";
import { useCallback, useState } from "react";
import z from "zod";

interface ContentChangeProps {
  text: string;
  isValid: boolean;
  editorState: EditorState;
}

interface UseEmailFormProps {
  minimumWords: number;
}

const emailValidation = z.object({
  to: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "Invalid email address",
  }),
  subject: z.string().min(1, { message: "Subject cannot be empty" }).trim(),
  body: z.string().min(1, { message: "Email body cannot be empty" }).trim(),
});

export function useEmailForm({ minimumWords }: UseEmailFormProps) {
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {}
  );
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [isValid, setIsValid] = useState(false);

  // Handel Lexical content changes
  const onContentChange = useCallback(
    ({ text, isValid, editorState }: ContentChangeProps) => {
      setBody(text);
      setIsValid(isValid);
      setEditorState(editorState);
    },
    []
  );

  // Validate the whole form
  const validate = () => {
    const result = emailValidation.safeParse({
      to,
      subject,
      body,
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return null;
    }

    setErrors({});
    return result.data;
  };

  return {
    // State
    to,
    subject,
    body,
    editorState,
    isValid,
    errors,

    // Setters
    setTo,
    setSubject,
    setBody,
    setEditorState,

    // Handlers
    validate,
    onContentChange,
  };
}
