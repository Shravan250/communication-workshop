import { useEmailPage } from "@/hooks/useEmailPage";

export default function ScenarioCard() {
  const { scenario } = useEmailPage();

  return (
    <div className="bg-white p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Scenario</h1>
      <p className="text-gray-700 leading-relaxed">{scenario}</p>
    </div>
  );
}
