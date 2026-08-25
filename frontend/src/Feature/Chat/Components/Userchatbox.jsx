import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Sparkles, Paperclip, Image as ImageIcon, Mic, Send } from 'lucide-react';
import { usechat } from '../Hook/usechat';

import { useVoiceToText } from '../Hook/useVoiceToText';
import { useDispatch, useSelector } from 'react-redux';
import { addnewmessage } from '../chat.slice';
import Loading from '../Components/Chatloading/loading';
import ChatMessage from './ChatMessage';
import MarkdownRenderer from './MarkdownRenderer';

export default function Userchatbox({user}) {
  const [promptText, setPromptText] = useState('');
  const [tempMessage, setTempMessage] = useState(null);
  const [isNewReply, setIsNewReply] = useState(false);

  const userdata=user

  const textareaRef = useRef(null);

  // 1. NAYA ADDITION: Ek ref banayein jo track karega ki message bhej rahe hain ya nahi
  const isSendingRef = useRef(false);

  const dispatch = useDispatch();
  const chatHook = usechat();

  const { isListening, startListening } = useVoiceToText();

  const chatdata = useSelector((state) => state.chat.chats);
  const createdchatId = useSelector((state) => state.chat.createdchatId);
  const isLoading = useSelector((state) => state.chat.loading);
  const messages = useMemo(
    () => (createdchatId ? (chatdata[createdchatId]?.messages ?? []) : []),
    [chatdata, createdchatId],
  );

  // 2. NAYA ADDITION: Jab bhi Chat ID change ho, check karein ki sidebar se aayi hai ya submit se
  useEffect(() => {
    // Agar hum message nahi bhej rahe (yani user ne purani chat kholi hai)
    if (!isSendingRef.current) {
      setIsNewReply(false); // Typing effect OFF kar do
    }
  }, [createdchatId]);

  // --- Auto Resize Textarea Logic ---
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [promptText]);

  const handlePromptSubmit = async (event) => {
    event.preventDefault();
    const trimmedMessage = promptText.trim();
    if (!trimmedMessage) return;

    setPromptText('');

    setIsNewReply(true);
    // 3. NAYA ADDITION: Sending ko true karein kyuki user ne message bheja hai
    isSendingRef.current = true;

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    if (createdchatId) {
      dispatch(
        addnewmessage({
          chatId: createdchatId,
          content: trimmedMessage,
          role: 'user',
        }),
      );

      await chatHook.hendalsendchat({ message: trimmedMessage, chatId: createdchatId });

      // 4. NAYA ADDITION: Message chala gaya, isko wapas false kar do
      isSendingRef.current = false;
      return;
    }

    setTempMessage({ content: trimmedMessage, role: 'user' });
    await chatHook.hendalsendchat({ message: trimmedMessage, chatId: null });

    // 5. NAYA ADDITION: Message chala gaya, isko wapas false kar do
    isSendingRef.current = false;
  };
  return (
    <main className="flex-1 flex flex-col items-end p-6 relative overflow-hidden bg-gradient-to-b from-transparent via-white/50 to-indigo-50/30">
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
            alt="Avatar"
            loading="lazy"
            decoding="async"
            className="w-7 h-7 rounded-lg object-cover border border-white shadow-sm"
          />
        </div>
      </div>

      <div className="mx-auto w-full flex flex-col items-center z-10">
        <div className="w-full max-w-5xl mb-24 flex flex-col gap-6">
          <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto scrollbar-hide pr-1 pb-22 scroll-smooth">
            {(createdchatId && messages.length > 0) || tempMessage ? (
              <>
                {/* ... (आपका पहले वाला मैसेजेस रेंडर करने का कोड बिल्कुल वैसा ही रहेगा) ... */}
                {tempMessage && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3 justify-end">
                      <div className="rounded-2xl px-4 py-3 bg-indigo-600 text-white shadow-md max-w-[80%]">
                        <div className="text-mb leading-7 font-medium">
                          <MarkdownRenderer>{tempMessage.content}</MarkdownRenderer>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {createdchatId &&
                  messages.map((obj, index, arr) => {
                    const isLastMessage = index === arr.length - 1;
                    return (
                      <ChatMessage
                        key={obj.id ?? `${obj.role}-${index}`}
                        obj={obj}
                        index={index}
                        isLastMessage={isLastMessage}
                        isNewReply={isNewReply}
                      />
                    );
                  })}

                {isLoading && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3 justify-start">
                      <div className="rounded-2xl px-4 py-3 text-gray-700 mb-2 max-w-[80%]">
                        <Loading />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-6 mt-20">
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-tr from-indigo-300 via-purple-200 to-pink-200 shadow-lg shadow-indigo-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] rounded-full"></div>
                  <div className="w-6 h-6 bg-white/60 rounded-full blur-[2px] absolute top-2 left-3"></div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 tracking-tight">
                 Welcome ,  {userdata.username}
                  <br />
                  <span className="text-gray-800">How Can I </span>
                  <span className="text-indigo-600">Assist You Today?</span>
                </h1>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handlePromptSubmit}
          className="w-full bg-white/70 backdrop-blur-md border border-indigo-100 rounded-2xl p-4 shadow-xl shadow-indigo-500/5 absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 max-w-3xl"
        >
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
            <textarea
              ref={textareaRef}
              name="prompt"
              value={promptText}
              rows={1}
              onChange={(event) => setPromptText(event.target.value)}
              placeholder="Initiate a query or send a command to the AI..."
              className="w-full bg-transparent border-none text-xs md:text-sm text-gray-700 placeholder-gray-400 focus:outline-none resize-none min-h-[32px] max-h-[250px] overflow-y-auto"
            ></textarea>
          </div>

          <div className="flex items-end justify-end border-t border-gray-100/60 pt-3">
            <div className="flex items-end  gap-2">
              {/* 3. यहाँ onClick में startListening को setPromptText पास कर दिया */}
              <button
                type="button"
                onClick={() => startListening(setPromptText)}
                className={`w-7 h-7 active:scale-95 text-white rounded-lg flex items-center justify-center shadow-md transition ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 shadow-red-200 animate-pulse'
                    : 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-200'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
              <button
                type="submit"
                className="w-7 h-7 active:scale-95 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-md shadow-indigo-200 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>
    </main>
  );
}
