import React, { useEffect, useState } from 'react';
import {
  Plus,
  Bot,
  X,
  Minus,
  Maximize2,
  MoreHorizontal,
  Search,
  Home,
  Compass,
  BookOpen,
  Clock,
  ChevronsUpDown,
  ChevronDown,
  Sparkles,
  Paperclip,
  Lightbulb,
  Image as ImageIcon,
  Globe,
  Mic,
  Cross,
  XIcon,
  Send,
  MessageSquare,
  ChevronsUp,
} from 'lucide-react';
import Profilecard from '../Components/Profilecard';
import { usechat } from '../Hook/usechat';
import { useSelector } from 'react-redux';

export default function Dashboard() {


  // State and Hooks
  const [promptText, setPromptText] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);



  const chatHook = usechat();
  const chats = useSelector((state) => state.chat.chats);
  const createdchatId = useSelector((state) => state.chat.createdchatId);
  const user = useSelector((state) => state.auth.user);

  console.log('User:', user);
  useEffect(() => {
    chatHook.initializeSocket();
    chatHook.hendalgetchat();
  }, []);


  // Function to handle prompt submission

  const handlePromptSubmit = async (event) => {
    event.preventDefault();
    const trimmedMessage = promptText.trim();
    if (!trimmedMessage) return;

    await chatHook.hendalsendchat({ message: trimmedMessage, chatId: createdchatId });
    setPromptText('');
  };

  const openedChat = (chatId) => {
    chatHook.handelgetmessages(chatId);
  };




  return (
    <div className="bg-[#f2f3f7] w-full h-screen flex items-center justify-center text-gray-700 font-sans">
      
      <div className="w-full  h-screen bg-[#f8f9fc] rounded-3xl shadow-2xl border border-white/60 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-64 bg-[#f2f3f7]/50 border-r border-gray-200/60  flex flex-col justify-between">
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex items-center gap-2 px-2 pt-1">
                <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
                  <img src="/neo_ai.png" alt="Logo" className="h-full w-full object-cover" />
                </div>
                <span className="font-bold text-lg text-gray-900 tracking-tight">NEO AI</span>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 rounded-xl hover:bg-white/80 transition-colors"
                >
                  <Home className="w-4 h-4 text-gray-500" /> Home
                </a>
                <a
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 rounded-xl hover:bg-white/80 transition-colors"
                >
                  <Search className="w-4 h-4 text-gray-500" /> Search Chats
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 rounded-xl hover:bg-white/80 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-gray-500" /> Library
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 rounded-xl hover:bg-white/80 transition-colors"
                >
                  <Clock className="w-4 h-4 text-gray-500" /> History
                </a>
              </nav>

              {/* History Sections */}
              <div className="space-y-4 pt-2">
                <div>
                  <ul className="space-y-1 max-h-[350px] overflow-y-auto scroll-smooth scrollbar-hide">
                    {Object.values(chats).map((chat) => (
                      <li key={chat.id}>
                        <button
                          onClick={() => {
                            openedChat(chat.id);
                          }}
                          className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 rounded-xl hover:bg-white/80 transition-colors w-full"
                        >
                          <MessageSquare className="w-4 h-4 text-gray-500 shrink-0" />
                          <span className="truncate">{chat.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* User Profile Card */}
              <div
                onClick={() => setIsProfileOpen(true)}
                className="bg-white/80 border border-gray-200/80 rounded-xl p-2 mt-18 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                    alt="Avatar"
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-gray-800 truncate">Judha Maygustya</p>
                    <p className="text-[10px] text-gray-400 truncate">judha.design@gmail.com</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <ChevronsUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Workspace */}
          <main className="flex-1 flex flex-col justify-center items-end p-6 relative overflow-hidden bg-gradient-to-b from-transparent via-white/50 to-indigo-50/30">
            {/* Header Controls */}
            <div className="flex items-center justify-between z-10">
              {/* Action Controls */}
              <div className="flex items-center  gap-3">
                <button className="flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white px-3 py-1.5 rounded-xl text-xs font-medium shadow-md transition">
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Chat</span>
                </button>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                  alt="Avatar"
                  className="w-7 h-7 rounded-lg object-cover border border-white shadow-sm"
                />
              </div>
            </div>

            {/* Center Greeting & Prompt Box */}
            <div className="max-w-2xl mx-auto w-full flex flex-col items-center justify-center my-auto z-10">
              {/* Glossy Sphere Decorative Element */}

              <div className="w-full max-w-3xl mb-24 flex flex-col gap-6">
                <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto scrollbar-hide pr-1 pb-22 scroll-smooth">
                  {createdchatId && chats[createdchatId]?.messages?.length > 0 ? (
                    chats[createdchatId].messages.map((obj, index) => (
                      <div key={obj.id || index} className="flex flex-col gap-3">
                        <div
                          className={`flex items-start gap-3 ${obj.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`rounded-2xl px-4 py-3 shadow-sm max-w-[80%] ${
                              obj.role === 'user'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-white/80 border border-indigo-100 text-gray-700 backdrop-blur-sm mb-2'
                            }`}
                          >
                            <p className={`text-sm leading-relaxed ${obj.role === 'user' ? 'font-medium' : ''}`}>
                              {obj.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-6 mt-20">
                      <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-tr from-indigo-300 via-purple-200 to-pink-200 shadow-lg shadow-indigo-100 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] rounded-full"></div>
                        <div className="w-6 h-6 bg-white/60 rounded-full blur-[2px] absolute top-2 left-3"></div>
                      </div>

                      {/* Greeting */}
                      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 tracking-tight">
                        Good Morning, Judha
                        <br />
                        <span className="text-gray-800">How Can I </span>
                        <span className="text-indigo-600">Assist You Today?</span>
                      </h1>
                    </div>
                  )}
                </div>
              </div>
              {/* Prompt Box */}
              <form
                onSubmit={handlePromptSubmit}
                className="w-full bg-white/70 backdrop-blur-md border border-indigo-100 rounded-2xl p-4 shadow-xl shadow-indigo-500/5 absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 max-w-3xl"
              >
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <textarea
                    name="prompt"
                    value={promptText}
                    onChange={(event) => setPromptText(event.target.value)}
                    placeholder="Initiate a query or send a command to the AI..."
                    className="w-full bg-transparent border-none text-xs md:text-sm text-gray-700 placeholder-gray-400 focus:outline-none resize-none h-8"
                  ></textarea>
                </div>

                {/* Bottom Actions Bar */}
                <div className="flex items-center justify-between border-t border-gray-100/60 pt-3">
                  {/* Feature Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      className="flex items-center gap-1 px-2.5 py-1 bg-gray-100/80 hover:bg-gray-200/80 rounded-lg text-[11px] font-medium text-gray-600 transition"
                    >
                      <ImageIcon className="w-3 h-3 text-gray-500" />
                      <span>Create Image</span>
                    </button>
                  </div>

                  {/* Submit / Voice Action Button */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="w-7 h-7 bg-indigo-500 active:scale-95 hover:bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-md shadow-indigo-200 transition"
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

            {/* Footer Background Gradient Glow */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>
          </main>
        </div>

        {/* search */}
        <div
          className={`flex w-[800px] h-[600px] items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-4 ${isSearchOpen ? 'block' : 'hidden'}`}
        >
          {/* Search Card Container */}
          <div className="w-full h-full  overflow-hidden rounded-xl bg-white p-6 text-gray-200 shadow-2xl border border-white/5">
            {/* Top Search Input Header */}
            <div className="flex items-center justify-between pb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-base text-gray-500 placeholder-gray-500 focus:outline-none cursor-default"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="ml-2 text-gray-400 hover:text-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            Recent Chats Section
            {/* <div className="mt-2">
              <p className="mb-4 text-xs text-gray-400 font-normal">Recent chats</p>

              {/* List Items */}
              {/* <div className="space-y-3">
                {recentChats.map((chat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-500 hover:text-black cursor-pointer transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="truncate">{chat}</span>
                  </div>
                ))}
              </div> */}
            {/* </div>  */}
          </div>
        </div>

        <Profilecard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      </div>
    </div>
  );
}
