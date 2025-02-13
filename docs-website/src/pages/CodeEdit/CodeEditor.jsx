import { useEffect, useState } from 'react';
import { FiPlay } from 'react-icons/fi';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';
import beautify from 'js-beautify';

const defaultCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neko Test</title>
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
    <h1>Hello Neko!</h1>
  </div>
</body>
</html>
`.trim();

function CodeEditor() {
    const [code, setCode] = useState(defaultCode);
    const [output, setOutput] = useState(defaultCode);

    useEffect(() => {
        const savedCode = localStorage.getItem('markdown_content');
        if (savedCode) {
            try {
                const formattedCode = beautify.html(savedCode, {
                    indent_size: 2,
                    space_in_empty_paren: true,
                });

                setCode(formattedCode);
                setOutput(formattedCode);
            } catch (error) {
                console.error(error);
                setCode(defaultCode);
                setOutput(defaultCode);
            }
        }
    }, []);

    const handleRun = () => {
        setOutput(code);
        localStorage.setItem('markdown_content', code);
    };

    const highlight = (code) => {
        const language = Prism.languages.markup;
        return Prism.highlight(code, language, 'markup');
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

                    <Editor
                        value={code}
                        onValueChange={setCode}
                        highlight={highlight}
                        padding={10}
                        className='relative bg-black/50 p-2 rounded-lg overflow-auto min-h-[100vh]'
                        textareaId="code-editor"
                        textareaClassName="outline-none border-none bg-transparent text-white font-mono"
                    />
                </div>
            </div>

            {/* Output */}
            <div className="p-4">
                <div className="border border-white/20 rounded-xl shadow-lg p-4 flex-1 bg-white">
                    <span className="text-sm text-black">Output</span>
                    <iframe
                        title="output"
                        className="w-full h-[80vh] rounded-lg border mt-2"
                        srcDoc={output}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;