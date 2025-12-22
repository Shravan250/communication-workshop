import { Copy, Sparkles } from "lucide-react";
import TextEditor from "../TextEditor";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEmailForm } from "@/hooks/useEmailForm";
import { useEmailPage } from "@/hooks/useEmailPage";

export default function EmailComposition() {
  const { setForm } = useEmailPage();
  const { isValid, errors, setTo, setSubject, validate, onContentChange } =
    useEmailForm({ minimumWords: 50 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validated = validate();
    if (!validated) return;

    console.log("Final validated payload:", validated);

    setForm(validated);
  };

  return (
    <div className="bg-white p-8 rounded-lg">
      {Object.keys(errors).length > 0 && (
        <div className="text-red-600 space-y-1 my-5">
          {Object.entries(errors).map(([field, msgs]) =>
            (msgs || []).map((msg, i) => (
              <div key={`${field}-${i}`}>
                {field}: {msg}
              </div>
            ))
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label htmlFor="email" className="text-lg font-medium w-24">
            To:
          </label>
          <Input
            id="email"
            type="email"
            placeholder="receiver email"
            className="flex-1"
            onChange={(e) => setTo(e.target.value)}
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
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="mt-2">
          <TextEditor minimumWords={50} onContentChange={onContentChange} />
        </div>

        <div className="flex items-center justify-end gap-4 mt-2">
          <Button
            type="submit"
            variant="outline"
            disabled={!isValid}
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
  );
}
