import TextEditor from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { BookCheck, Brain, Copy, Sparkles } from "lucide-react";

export default function EmailPage() {
  return (
    <section className="p-8 w-3/4 mx-auto min-h-screen">
      <div className="flex flex-col gap-6">
        {/* Top Section: Scenario + Controls */}
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          {/* Scenario Card */}
          <div className="bg-white p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Scenario</h1>
            <p className="text-gray-700 leading-relaxed">
              You have received an email from your manager asking you to prepare
              a report on the recent sales performance of your team. The report
              should include key metrics, analysis of trends, and
              recommendations for improvement. You need to draft a professional
              email response acknowledging the request and outlining your plan
              to complete the report within the given deadline.
            </p>
          </div>

          {/* Controls Panel */}
          <div className="flex flex-col gap-4">
            {/* Difficulty Setting - Intentionally left for custom implementation */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Difficulty Setting
              </h3>
              {/* Custom difficulty controls will be implemented here */}
            </div>

            {/* Scenario Generation Button */}
            <Button
              variant="outline"
              className="bg-[#1EC964] border-[#89E3AE] p-5 text-lg rounded-xl text-white flex items-center justify-center gap-2 hover:bg-[#1AB557]"
            >
              <Brain />
              <span>Scenario Generation</span>
            </Button>
          </div>
        </div>

        {/* Email Composition Form */}
        <div className="bg-white p-8 rounded-lg">
          <form className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="email" className="text-lg font-medium w-24">
                To:
              </label>
              <Input
                id="email"
                type="email"
                placeholder="receiver email"
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="subject" className="text-lg font-medium w-24">
                Subject:
              </label>
              <Input
                id="subject"
                type="text"
                placeholder="subject..."
                className="flex-1"
              />
            </div>

            <div className="mt-2">
              <TextEditor />
            </div>

            <div className="flex items-center justify-end gap-4 mt-2">
              <Button
                type="submit"
                variant="outline"
                className="bg-[#1EC964] border-[#89E3AE] px-6 py-3 rounded-lg flex items-center gap-2 text-white hover:bg-[#1AB557]"
              >
                <Sparkles />
                <span>Evaluate</span>
              </Button>
              <Button
                type="button"
                variant="default"
                className="bg-gray-400 px-6 py-3 rounded-lg flex items-center gap-2 text-white hover:bg-gray-500"
              >
                <Copy />
                <span>Copy Document</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Evaluation Report Card */}
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-3xl text-center font-bold mb-6 bg-gradient-to-r from-cyan-700 via-teal-400 to-blue-700 bg-clip-text text-transparent">
            Evaluation Report
          </h2>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8 pb-6 border-b border-gray-200">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold mb-2">Clarity</h3>
              <p className="text-lg text-gray-700">4/5</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold mb-2">Tone</h3>
              <p className="text-lg text-gray-700">4/5</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold mb-2">Structure</h3>
              <p className="text-lg text-gray-700">4/5</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold mb-2">Professionalism</h3>
              <p className="text-lg text-gray-700">4/5</p>
            </div>
          </div>

          {/* Feedback Summary */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Highlight</h4>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti vel in impedit odit libero! Optio architecto modi quas
                veritatis dolore?
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                Soft improvement suggestion
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti vel in impedit odit libero! Optio architecto modi quas
                veritatis dolore?
              </p>
            </div>

            <div className="text-center pt-4">
              <p className="font-bold text-2xl text-gray-800">
                Encouragement closer
              </p>
            </div>
          </div>
        </div>

        {/* Answer Verification & Tone Adjustment Section */}
        <div className="bg-white p-8 rounded-lg">
          <div className="grid grid-cols-[auto_1fr] gap-8 items-center">
            {/* Check Answer Button */}
            <Button
              type="button"
              variant="outline"
              className="bg-[#1EC964] border-[#89E3AE] min-w-72 px-8 py-5 text-lg rounded-xl text-white flex items-center gap-2 hover:bg-[#1AB557] whitespace-nowrap"
            >
              <BookCheck />
              <span>Check Answer</span>
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

        {/* Detailed Feedback Section */}
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Detailed Feedback</h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nunc ut laoreet tincidunt, nunc nisl aliquam nunc, eget
            aliquam nisl nunc vel nisl. Sed euismod, nunc ut laoreet tincidunt,
            nunc nisl aliquam nunc, eget aliquam nisl nunc vel nisl.
          </p>
        </div>
      </div>
    </section>
  );
}
