import { Brain } from "lucide-react";
import { Button } from "../ui/button";
import { useEmailPage } from "@/hooks/useEmailPage";

export default function ControlsPanel() {
  const { difficulty, setScenario, setDifficulty } = useEmailPage();

  const handleScenarioGeneration = () => {
    // Placeholder logic for scenario generation based on difficulty
    let newScenario = "";
    if (difficulty === "easy") {
      newScenario =
        "You need to send a friendly reminder email to a colleague about an upcoming meeting.";
    } else if (difficulty === "medium") {
      newScenario =
        "You have received an email from your manager asking you to prepare a report on the recent sales performance of your team. The report should include key metrics, analysis of trends, and recommendations for improvement. You need to draft a professional email response acknowledging the request and outlining your plan to complete the report within the given deadline.";
    } else if (difficulty === "hard") {
      newScenario =
        "You have to respond to a client complaint regarding a delayed project delivery. The email should address the client's concerns, provide a clear explanation for the delay, outline the steps being taken to resolve the issue, and offer compensation or reassurance to maintain a positive business relationship.";
    }
    setScenario(newScenario);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Difficulty Setting*/}
      <div className="bg-white p-6 rounded-lg flex-1">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Difficulty Setting
        </h3>
        {/* Custom difficulty controls will be implemented here */}
      </div>

      {/* Scenario Generation Button */}
      <Button
        variant="outline"
        className="bg-[#1EC964] border-[#89E3AE] p-5 text-lg rounded-xl text-white flex items-center justify-center gap-2 hover:bg-[#1AB557]"
        onClick={handleScenarioGeneration}
      >
        <Brain />
        <span>Scenario Generation</span>
      </Button>
    </div>
  );
}
