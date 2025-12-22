interface EvaluationReportProps {
  metrics: {
    clarity: number;
    tone: number;
    structure: number;
    professionalism: number;
  };
  highlight: string;
  suggestion: string;
  encouragement: string;
}

export default function EvaluationReport({
  metrics,
  highlight,
  suggestion,
  encouragement,
}: EvaluationReportProps) {
  return (
    <div className="bg-white p-8 rounded-lg">
      <h2 className="text-3xl text-center font-bold mb-6 bg-linear-to-r from-cyan-700 via-teal-400 to-blue-700 bg-clip-text text-transparent">
        Evaluation Report
      </h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8 pb-6 border-b border-gray-200">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold mb-2">Clarity</h3>
          <p className="text-lg text-gray-700">{metrics.clarity}/5</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold mb-2">Tone</h3>
          <p className="text-lg text-gray-700">{metrics.tone}/5</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold mb-2">Structure</h3>
          <p className="text-lg text-gray-700">{metrics.structure}/5</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold mb-2">Professionalism</h3>
          <p className="text-lg text-gray-700">{metrics.professionalism}/5</p>
        </div>
      </div>

      {/* Feedback Summary */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-6">
        <div>
          <h4 className="font-semibold text-lg mb-2">Highlight</h4>
          <p className="text-gray-700 leading-relaxed">{highlight}</p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">
            Soft improvement suggestion
          </h4>
          <p className="text-gray-700 leading-relaxed">{suggestion}</p>
        </div>

        <div className="text-center pt-4">
          <p className="font-bold text-2xl text-gray-800">{encouragement}</p>
        </div>
      </div>
    </div>
  );
}
