import { Highlight, themes } from 'prism-react-renderer';
import { isValidElement, useState } from 'react';
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { useNotification } from '../../contexts/useNotification';

const CodeBlock = ({ code, language = 'jsx' }) => {
    const [copied, setCopied] = useState(false);
    const { showNotification } = useNotification();

    if (isValidElement(code)) {
        return (
            <div className="rounded-xl overflow-hidden shadow-2xl bg-[#011627]/90 ring-1 ring-white/20 transition-all duration-300 hover:shadow-3xl hover:shadow-blue-500/10 backdrop-blur-sm my-6">
                <div className="bg-gray-800/50 px-4 py-2.5 flex items-center border-b border-gray-700/50 backdrop-blur-md">
                    <div className="flex space-x-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-lg shadow-red-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-lg shadow-yellow-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-lg shadow-green-500/20"></div>
                    </div>
                    <div className="flex-1">
                        <span className="text-gray-400 text-sm font-mono ml-2">{language}</span>
                    </div>
                </div>

                <div className="p-4 text-pink-400 font-mono">
                    {code}
                </div>
            </div>
        );
    }

    const codeString = typeof code === 'string' ? code : String(code);
    
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(codeString.trim());
            setCopied(true);
            showNotification('คัดลอกโค้ดไปยังคลิปบอร์ดแล้ว', true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            showNotification('ไม่สามารถคัดลอกโค้ดได้', false);
        }
    };
    
    return (
        <>
            <div className="rounded-xl overflow-hidden shadow-2xl bg-[#011627]/90 ring-1 ring-white/20 transition-all duration-300 hover:shadow-3xl hover:shadow-blue-500/10 backdrop-blur-sm my-6">
                {/* ส่วนหัวของ Terminal */}
                <div className="bg-gray-800/50 px-4 py-2.5 flex items-center border-b border-gray-700/50 backdrop-blur-md">
                    <div className="flex space-x-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-lg shadow-red-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-lg shadow-yellow-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-lg shadow-green-500/20"></div>
                    </div>
                    <div className="flex-1">
                        <span className="text-gray-400 text-sm font-mono ml-2">{language}</span>
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                        {copied ? (
                            <span className="flex items-center space-x-2">
                                <HiClipboardCheck className="w-5 h-5 text-green-500" />
                                <span className="text-sm">Copied!</span>
                            </span>
                        ) : (
                            <span className="flex items-center space-x-2">
                                <HiClipboard className="w-5 h-5" />
                                <span className="text-sm">Copy</span>
                            </span>
                        )}
                    </button>
                </div>

                {/* ส่วนแสดงโค้ด */}
                <Highlight
                    theme={{
                        ...themes.nightOwl,
                        plain: { 
                            ...themes.nightOwl.plain, 
                            backgroundColor: 'transparent',
                            fontSize: '14px',
                            lineHeight: '1.7'
                        }
                    }}
                    code={codeString.trim()}
                    language={language}
                >
                    {({ tokens, getLineProps, getTokenProps }) => (
                        <div className="p-4">
                            <pre className="font-mono text-[14px] leading-relaxed">
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })} className="table-row">
                                        <span className="table-cell pr-4 text-gray-500/50 text-xs select-none text-right">
                                            {(i + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span className="table-cell">
                                            {line.map((token, key) => (
                                                <span key={key} {...getTokenProps({ token })} />
                                            ))}
                                        </span>
                                    </div>
                                ))}
                            </pre>
                        </div>
                    )}
                </Highlight>
            </div>
        </>
    );
};

CodeBlock.propTypes = {
    code: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    language: PropTypes.string
};

export default CodeBlock;
