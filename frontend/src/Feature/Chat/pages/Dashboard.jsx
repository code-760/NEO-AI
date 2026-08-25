import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Search, Home, BookOpen, Clock, MessageSquare, ChevronsUp } from 'lucide-react';
import { usechat } from '../Hook/usechat';
import { useSelector } from 'react-redux';

const Userchatbox = lazy(() => import('../Components/Userchatbox'));
const Searchpage = lazy(() => import('../Components/search'));
const Profilecard = lazy(() => import('../Components/Profilecard'));

const scheduleIdleTask = (callback) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback);
    return;
  }

  setTimeout(callback, 0);
};

export default function Dashboard() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const chatHook = usechat();
  const chatdata = useSelector((state) => state.chat.chats);
  const user = useSelector((state) => state.auth.user);
  const chats = Object.values(chatdata).reverse();

  useEffect(() => {
    scheduleIdleTask(() => {
      chatHook.initializeSocket();
      chatHook.hendalgetchat();
    });

    return () => {
      chatHook.disconnectSocket();
    };
  }, []);

  const openedChat = (chatId) => {
    chatHook.handelgetmessages(chatId);
    
  };

  return (
    <div className="bg-[#f2f3f7] w-full h-screen flex items-center justify-center text-gray-700 font-sans">
      <div className="w-full h-screen bg-[#f8f9fc] rounded-3xl shadow-2xl border border-white/60 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-64 bg-[#f2f3f7]/50 border-r border-gray-200/60 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-2 pt-1">
                <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
                  <img
                    src="https://ik.imagekit.io/zo9aabuxd/neo_ai.webp"
                    alt="Logo"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-bold text-lg text-gray-900 tracking-tight">NEO AI</span>
              </div>

              <nav className="space-y-1">
                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 rounded-xl hover:bg-white/80 transition-colors"
                >
                  <Home className="w-4 h-4 text-gray-500" /> Home
                </a>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 rounded-xl hover:bg-white/80 transition-colors w-full text-left"
                >
                  <Search className="w-4 h-4 text-gray-500" /> Search Chats
                </button>

                <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 rounded-xl hover:bg-white/80 transition-colors"
                >
                  <Clock className="w-4 h-4 text-gray-500" /> History
                </a>
              </nav>

              <div className="space-y-4 pt-2">
                <div>
                  <ul className="space-y-1 max-h-[350px] h-[350px] overflow-y-auto scroll-smooth scrollbar-hide">
                    {chats.map((chat) => (
                      <li key={chat.id}>
                        <button
                          onClick={() => openedChat(chat.id)}
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

              <div
                onClick={() => setIsProfileOpen(true)}
                className="bg-white/80 border border-gray-200/80 rounded-xl p-2 mt-18 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <img
                    src="https://ik.imagekit.io/zo9aabuxd/83bc8b88cf6bc4b4e04d153a418cde62.webp"
                    alt="Avatar"
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-gray-800 truncate">{user.username}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <ChevronsUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>

          <Suspense fallback={<div className="flex-1 bg-white/30" />}>
            <Userchatbox user={user} />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <Searchpage isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </Suspense>

        <Suspense fallback={null}>
          <Profilecard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} />
        </Suspense>
      </div>
    </div>
  );
}
