import React, { useState } from 'react';
// 1. Prism को इम्पोर्ट करें, जो कोड को हाइलाइट करता है
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 2. VS Code Dark+ वाली सही थीम इम्पोर्ट करें
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, children, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const codeText = String(children).replace(/\n$/, '');
    navigator.clipboard.writeText(codeText);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  
  const lowerLang = (language || 'cpp').toLowerCase();
  const safeLanguage = lowerLang === 'js' || lowerLang === 'cpp' ? 'cpp' : lowerLang;

  
  const customStyle = {
    margin: 0,
    padding: '1rem', 
    backgroundColor: 'transparent', 
    fontFamily: '"Consolas", "Monaco", monospace',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    overflowX: 'auto', 
  };

  return (
    
    <div className="rounded-xl overflow-hidden my-4 border border-gray-700/50 bg-[#1e1e1e] shadow-lg">
     
      <div className="flex justify-between items-center bg-[#2d2d2d] text-gray-400 px-4 py-2 text-xs font-sans border-b border-gray-700/50">
        <span className="lowercase">{safeLanguage}</span>

        <button onClick={handleCopy} className="flex items-center gap-1.5 hover:text-gray-100 transition-colors">
          {isCopied ? (
            <>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

     
      <SyntaxHighlighter
        style={vscDarkPlus} 
        language={safeLanguage}
        PreTag="div" 
        customStyle={customStyle}
        {...props} 
      >
      
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

export const codeBoxRenderers = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');

    return !inline ? (
     
      <CodeBlock language={match ? match[1] : 'cpp'} {...props}>
        {children}
      </CodeBlock>
    ) : (
      
      <code
        {...props}
        className="bg-gray-800 text-[#ce9178] px-1.5 py-0.5 rounded-md text-[0.85em] font-mono border border-gray-700"
      >
        {children}
      </code>
    );
  },
};
