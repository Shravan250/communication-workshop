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
  const [optimizedEmail, setOptimizedEmail] = useState({
    subject: "",
    body: "",
    signature: "",
  });

  const handleCopy = () => {
    const content = `To: ${form.to}\nSubject: ${form.subject}\n\n${form.body}`;
    navigator.clipboard.writeText(content);
  };

  const getModalAnswer = async () => {
    const userEmail = form.body;
    try {
      const res = await fetch("/api/optimized-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario, userEmail, tone }),
      });

      if (!res.ok) throw new Error("Failed to generate optimized email");

      const data = await res.json();
      console.log(data);
      setOptimizedEmail(data.optimizedEmail);
      console.log(optimizedEmail);
      setIsCheckAnswerClicked(true);
    } catch (err) {
      console.error(
        "Failed to generate optimized email. Please try again.",
        err
      );
    }
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
    optimizedEmail,

    //Setters
    setScenario,
    setDifficulty,
    setIsCheckAnswerClicked,
    setTone,
    setForm,
    setEvaluationResponse,

    //handlers
    handleCopy,
    getModalAnswer,
  };
}
