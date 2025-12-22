import { useState } from "react";

export function useEmailPage() {
  let isFormSubmitted = true;

  const [scenario, setScenario] = useState("Placeholder");
  const [difficulty, setDifficulty] = useState("medium");
  const [isCheckAnswerClicked, setIsCheckAnswerClicked] = useState(true);
  const [form, setForm] = useState({
    to: "",
    subject: "",
    body: "",
  });

  return {
    isFormSubmitted,

    //state
    scenario,
    difficulty,
    isCheckAnswerClicked,
    form,

    //Setters
    setScenario,
    setDifficulty,
    setIsCheckAnswerClicked,
    setForm,
  };
}
