import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownTypewriter from './MarkdownTypewriter';
import { codeBoxRenderers } from './codeBoxRenderers';
 // Import the new component

const ChatMessage = ({ isNewReply, isLastMessage, obj }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className={`flex items-start gap-3 ${obj.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            obj.role === 'user' ? 'bg-indigo-600 text-white shadow-md max-w-[80%]' : 'text-gray-700 mb-2'
          }`}
        >
          <div className={`text-base leading-7 ${obj.role === 'user' ? 'font-medium' : ''}`}>
            {obj.role === 'user' || !isLastMessage || !isNewReply ? (
              // Instantly show user messages or old AI messages
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={codeBoxRenderers}>
                {obj.content}
              </ReactMarkdown>
            ) : (
              // Typewriter effect for the latest AI reply
              <MarkdownTypewriter text={obj.content} speed={20} components={codeBoxRenderers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatMessage);
