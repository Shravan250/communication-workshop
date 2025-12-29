import { EvaluationResponse } from "@/app/api/evaluate-email/route";
import { useState } from "react";

export function useEmailPage() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [scenario, setScenario] = useState("Placeholder");
  const [difficulty, setDifficulty] = useState("medium");
  const [isCheckAnswerClicked, setIsCheckAnswerClicked] = useState(false);
  const [tone, setTone] = useState(50);
  const [form, setForm] = useState({
    to: "",
    subject: "",
    body: "",
  });
  const [evaluationResponse, setEvaluationResponse] =
    useState<EvaluationResponse>({
      metrics: {
        clarity: 3,
        tone: 3,
        structure: 3,
        professionalism: 3,
      },
      highlight: "",
      suggestion: "",
      encouragement: "",
    });

  const handleCopy = () => {
    const content = `To: ${form.to}\nSubject: ${form.subject}\n\n${form.body}`;
    navigator.clipboard.writeText(content);
  };

  return {
    //state
    isFormSubmitted,
    setIsFormSubmitted,
    scenario,
    difficulty,
    isCheckAnswerClicked,
    tone,
    form,
    evaluationResponse,

    //Setters
    setScenario,
    setDifficulty,
    setIsCheckAnswerClicked,
    setTone,
    setForm,
    setEvaluationResponse,

    //handlers
    handleCopy,
  };
}
