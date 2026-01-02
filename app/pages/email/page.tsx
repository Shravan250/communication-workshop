"use client";

import ControlsPanel from "@/components/email-comp/ControlPanel";
import EmailComposition from "@/components/email-comp/EmailComposition";
import EvaluationReport from "@/components/email-comp/EvaluationReport";
import ScenarioCard from "@/components/email-comp/ScenarioCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useEmailPage } from "@/hooks/useEmailPage";
import { BookCheck, RefreshCw } from "lucide-react";

export default function EmailPage() {
  const {
    isCheckAnswerClicked,
    isFormSubmitted,
    tone,
    setIsCheckAnswerClicked,
    setTone,
    setForm,
    setIsFormSubmitted,
    handleCopy,
    form,
    scenario,
    difficulty,
    setScenario,
    setDifficulty,
    evaluationResponse,
    setEvaluationResponse,
    optimizedEmail,
    getModalAnswer,
  } = useEmailPage();

  return (
    <section className="p-8 w-3/4 mx-auto min-h-screen">
      <div className="flex flex-col gap-6">
        {/* Top Section */}
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          {/* Scenario Card */}
          <ScenarioCard scenario={scenario} />

          {/* Controls Panel */}
          <ControlsPanel
            difficulty={difficulty}
            setScenario={setScenario}
            setDifficulty={setDifficulty}
          />
        </div>

        {/* Email Composition Form */}
        <EmailComposition
          form={form}
          scenario={scenario}
          setEvaluationResponse={setEvaluationResponse}
          setForm={setForm}
          setIsFormSubmitted={setIsFormSubmitted}
          handleCopy={handleCopy}
        />

        {/* Evaluation Report Card */}
        {isFormSubmitted && (
          <EvaluationReport
            metrics={evaluationResponse.metrics}
            highlight={evaluationResponse.highlight}
            suggestion={evaluationResponse.suggestion}
            encouragement={evaluationResponse.encouragement}
          />
        )}

        {/* Answer Verification & Tone Adjustment Section */}
        {isFormSubmitted && (
          <div className="bg-white p-8 rounded-lg">
            <div className="grid grid-cols-[auto_1fr] gap-8 items-center">
              {/* Check Answer Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => getModalAnswer()}
                className="bg-[#1EC964] border-[#89E3AE] min-w-72 px-8 py-5 text-lg rounded-xl text-white flex items-center gap-2 hover:bg-[#1AB557] whitespace-nowrap"
              >
                {!isCheckAnswerClicked ? <BookCheck /> : <RefreshCw />}
                <span>
                  {!isCheckAnswerClicked ? "Check Answer" : "Regenerate"}
                </span>
              </Button>

              {/* Tone Slider */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                  Relaxed
                </span>
                <Slider
                  value={[tone]}
                  onValueChange={(val) => setTone(val[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                  Corporate
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Feedback Section */}
        {isCheckAnswerClicked && isFormSubmitted && (
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Detailed Feedback</h2>
            <div className="text-gray-700 leading-relaxed">
              <h3>
                <span className="font-bold text-black leading-relaxed">
                  Subject:{" "}
                </span>
                {optimizedEmail.subject}
              </h3>
              <p style={{ whiteSpace: "pre-line" }}>{optimizedEmail.body}</p>
              <p>{optimizedEmail.signature}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
