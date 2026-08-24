import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateReadme } from './services/aiService';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      alert("Please paste some code or project description first!");
      return;
    }
    setLoading(true);
    try {
      const markdown = await generateReadme(input);
      setOutput(markdown);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <header className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          DevPulse AI
        </h1>
        <p className="text-slate-400 mt-2">Generate professional READMEs in seconds using AI</p>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
          <label className="text-sm font-medium text-slate-300 mb-2">
            Paste Code or Project Notes:
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. A React web application that lets users track daily water intake..."
            className="w-full flex-grow bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 min-h-[300px] resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Generating README..." : "Generate README.md"}
          </button>
        </div>

        {/* Output Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-200">Generated Output</h2>
            {output && (
              <button
                onClick={copyToClipboard}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition"
              >
                {copied ? "Copied!" : "Copy Markdown"}
              </button>
            )}
          </div>
          <div className="w-full flex-grow bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-y-auto max-h-[450px] text-slate-300 text-sm">
            {output ? (
              <ReactMarkdown>{output}</ReactMarkdown>
            ) : (
              <p className="text-slate-600 italic">Your generated README preview will appear here...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}