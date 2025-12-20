import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  $isTextNode,
  DOMConversionMap,
  DOMExportOutput,
  DOMExportOutputMap,
  isHTMLElement,
  Klass,
  LexicalEditor,
  LexicalNode,
  ParagraphNode,
  TextNode,
  EditorState,
  $getRoot,
} from "lexical";
import { useState, useCallback } from "react";

import ExampleTheme from "../ExampleTheme";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import { parseAllowedColor, parseAllowedFontSize } from "../styleConfig";

const placeholder =
  "Begin your creative journey here. This space is designed to inspire clarity and focus. Let your thoughts flow freely. Utilize the formatting tools above to structure your ideas, and the AI-powered actions below to enhance your writing. For instance, try generating a scenario to kickstart a new idea or evaluating your current draft for improvements. Every word crafted here contributes to your calm and productive workflow.";

const removeStylesExportDOM = (
  editor: LexicalEditor,
  target: LexicalNode
): DOMExportOutput => {
  const output = target.exportDOM(editor);
  if (output && isHTMLElement(output.element)) {
    for (const el of [
      output.element,
      ...output.element.querySelectorAll("[style],[class]"),
    ]) {
      el.removeAttribute("class");
      el.removeAttribute("style");
    }
  }
  return output;
};

const exportMap: DOMExportOutputMap = new Map<
  Klass<LexicalNode>,
  (editor: LexicalEditor, target: LexicalNode) => DOMExportOutput
>([
  [ParagraphNode, removeStylesExportDOM],
  [TextNode, removeStylesExportDOM],
]);

const getExtraStyles = (element: HTMLElement): string => {
  let extraStyles = "";
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  if (fontSize !== "" && fontSize !== "15px") {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== "" && backgroundColor !== "rgb(255, 255, 255)") {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== "" && color !== "rgb(0, 0, 0)") {
    extraStyles += `color: ${color};`;
  }
  return extraStyles;
};

const constructImportMap = (): DOMConversionMap => {
  const importMap: DOMConversionMap = {};
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const { forChild } = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }
  return importMap;
};

const editorConfig = {
  html: {
    export: exportMap,
    import: constructImportMap(),
  },
  namespace: "WritingCanvas",
  nodes: [ParagraphNode, TextNode],
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme,
};

// Word counter component
function WordCounter({ editorState }: { editorState: EditorState | null }) {
  if (!editorState) return <span>0 words / 0 characters</span>;

  let wordCount = 0;
  let charCount = 0;

  editorState.read(() => {
    const root = $getRoot();
    const text = root.getTextContent();
    charCount = text.length;
    wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  });

  return (
    <span className="text-sm text-gray-600">
      {wordCount} words / {charCount} characters
    </span>
  );
}

export default function TextEditor() {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [autoSaved, setAutoSaved] = useState(false);

  const onChange = useCallback((state: EditorState) => {
    setEditorState(state);
    setAutoSaved(true);
    setTimeout(() => setAutoSaved(false), 2000);
  }, []);

  return (
    <div className="py-3">
      <div className="max-w-full mx-auto">
        <LexicalComposer initialConfig={editorConfig}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Toolbar */}
            <div className="border-b border-gray-200">
              <ToolbarPlugin />
            </div>

            {/* Editor */}
            <div className="relative">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className="min-h-125 px-12 py-8 text-lg leading-relaxed text-gray-900 outline-none focus:outline-none"
                    aria-placeholder={placeholder}
                    placeholder={
                      <div className="absolute top-8 left-12 right-12 text-lg text-gray-400 pointer-events-none">
                        {placeholder}
                      </div>
                    }
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <OnChangePlugin onChange={onChange} />
              <HistoryPlugin />
              <AutoFocusPlugin />
            </div>

            {/* Footer with word count and autosave status */}
            <div className="flex justify-between items-center px-12 py-4 border-t border-gray-200 bg-gray-50">
              <WordCounter editorState={editorState} />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className={`w-4 h-4 ${
                    autoSaved ? "text-green-600" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Autosaved</span>
              </div>
            </div>
          </div>
        </LexicalComposer>
      </div>
    </div>
  );
}
