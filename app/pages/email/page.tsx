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
  const { isCheckAnswerClicked, isFormSubmitted, setIsCheckAnswerClicked } =
    useEmailPage();

  return (
    <section className="p-8 w-3/4 mx-auto min-h-screen">
      <div className="flex flex-col gap-6">
        {/* Top Section */}
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          {/* Scenario Card */}
          <ScenarioCard />

          {/* Controls Panel */}
          <ControlsPanel />
        </div>

        {/* Email Composition Form */}
        <EmailComposition />

        {/* Evaluation Report Card */}
        <EvaluationReport
          metrics={{
            clarity: 4,
            tone: 4,
            structure: 4,
            professionalism: 4,
          }}
          highlight="The email is clear and concise."
          suggestion="Consider adding a more formal greeting."
          encouragement="Great job overall!"
        />

        {/* Answer Verification & Tone Adjustment Section */}
        {isFormSubmitted && (
          <div className="bg-white p-8 rounded-lg">
            <div className="grid grid-cols-[auto_1fr] gap-8 items-center">
              {/* Check Answer Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCheckAnswerClicked((prev) => !prev)}
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
                  defaultValue={[50]}
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
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nunc ut laoreet tincidunt, nunc nisl aliquam nunc, eget
              aliquam nisl nunc vel nisl. Sed euismod, nunc ut laoreet
              tincidunt, nunc nisl aliquam nunc, eget aliquam nisl nunc vel
              nisl.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
