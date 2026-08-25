import React, { useEffect, useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { usechat } from '../Hook/usechat';
import { useSelector } from 'react-redux';

export default function Searchpage({ onClose, isOpen }) {
 const [search, setsearch] = useState('');
 const chatHook = usechat();
 const chatsearch = useSelector((state) => state.chat.searchChats);

 useEffect(() => {
   const timer = setTimeout(() => {
     if (search.trim()) {
       chatHook.hendalsearchchat(search);
     }
   }, 500);

   return () => {
     clearTimeout(timer);
   };
 }, [search]);

 const chatopne = (chatId) => {
   chatHook.handelgetmessages(chatId);
   onClose();
 };

 return (
   <div
     className={`flex w-[800px] h-[600px] items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-4 ${isOpen ? 'block' : 'hidden'}`}
   >
     <div className="w-full h-full overflow-hidden rounded-xl bg-white p-6 text-gray-200 shadow-2xl border border-white/5">
       <div className="flex items-center justify-between pb-4">
         <input
           type="text"
           placeholder="Search..."
           value={search}
           onChange={(event) => {
             setsearch(event.target.value);
           }}
           className="w-full bg-transparent text-base text-gray-500 placeholder-gray-500 focus:outline-none cursor-default"
         />
         <button onClick={onClose} className="ml-2 text-gray-400 hover:text-black transition-colors">
           <X className="h-5 w-5" />
         </button>
       </div>

       <div className="mt-2">
         <p className="mb-4 text-xs text-gray-400 font-normal">Recent chats</p>

         <div className="space-y-3">
           {chatsearch.map((chat, index) => (
             <div
               key={chat._id ?? index}
               className="flex items-center gap-3 text-sm text-gray-500 hover:text-black cursor-pointer transition-colors"
             >
               <MessageSquare className="h-4 w-4 text-gray-400 shrink-0" />
               <span className="truncate text-black" onClick={() => chatopne(chat._id)}>
                 {chat.title}
               </span>
             </div>
           ))}
         </div>
       </div>
     </div>
   </div>
 );
}

