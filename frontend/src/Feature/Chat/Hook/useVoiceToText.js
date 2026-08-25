import { useState } from 'react';

export const useVoiceToText = () => {
  const [isListening, setIsListening] = useState(false);

  const startListening = (onTextUpdate) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support voice input. Please use Google Chrome/Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // रुकने पर बंद हो जाएगा
    recognition.interimResults = true; // बोलते समय लाइव अपडेट

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');

      // यह फंक्शन आपके चैट बॉक्स के promptText को अपडेट करेगा
      onTextUpdate(currentTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Voice input error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return { isListening, startListening };
};
