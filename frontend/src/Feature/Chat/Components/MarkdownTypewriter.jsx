import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownTypewriter = ({ text, speed = 15 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    // Reset displayed text when new text comes in
    setDisplayedText('');

    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex >= text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>;
};

export default MarkdownTypewriter;
