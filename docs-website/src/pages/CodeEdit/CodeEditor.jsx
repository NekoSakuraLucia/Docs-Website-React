import { useRef, useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { FiPlay } from 'react-icons/fi';

const defaultCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Glassmorphism</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: url('https://source.unsplash.com/random/1920x1080') no-repeat center center/cover;
    }
    .glass {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      padding: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="glass">
    <h1>Hello Glassmorphism!</h1>
  </div>
</body>
</html>
`.trim();

function CodeEditor() {
    const [code, setCode] = useState(defaultCode);
    const [output, setOutput] = useState(defaultCode);
    const editorRef = useRef(null);

    const handleRun = () => {
        setOutput(code);
    };

    const handleInput = () => {
        if (editorRef.current) {
            setCode(editorRef.current.innerText);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-screen">
            {/* Code Editor */}
            <div className="p-4 flex flex-col">
                <div className="border border-white/20 rounded-xl shadow-lg p-4 flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">Code Editor</span>
                        <button
                            className="px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                            onClick={handleRun}
                        >
                            <FiPlay size={16} /> Run
                        </button>
                    </div>
                    <div
                        ref={editorRef}
                        contentEditable="true"
                        suppressContentEditableWarning
                        onInput={handleInput}
                        className="relative bg-black/50 p-2 rounded-lg overflow-auto max-h-[70vh]">
                        <Highlight theme={themes.nightOwl} code={code} language="html">
                            {({ style, tokens, getLineProps, getTokenProps }) => (
                                <pre style={style} className="text-sm leading-normal">
                                    {tokens.map((line, i) => {
                                        return (
                                            <div key={i} {...getLineProps({ line })}>
                                                {line.map((token, tokenIndex) => {
                                                    return <span key={`${i}-${tokenIndex}`} {...getTokenProps({ token })} />;
                                                })}
                                            </div>
                                        );
                                    })}
                                </pre>
                            )}
                        </Highlight>
                    </div>
                </div>
            </div>

            {/* Output */}
            <div className="p-4">
                <div className="border border-white/20 rounded-xl shadow-lg p-4 flex-1">
                    <span className="text-sm text-gray-300">Output</span>
                    <iframe
                        title="output"
                        className="w-full h-[80vh] rounded-lg border mt-2"
                        srcDoc={output}
                    />
                </div>
            </div>
        </div>
    );
}

export default CodeEditor;