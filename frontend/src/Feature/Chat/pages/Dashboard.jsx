import React, { useState } from 'react'
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


export default function Dashboard() {


  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);



  const recentChats = [
    'Advance recharge validity',
    '3-5 Words Title Generation',
    'Coding Interview Questions',
    'Toast error handling issue',
    'RPMC Colleges Rajasthan',
    'Top 10 Notification Libraries',
    'Tavily AI Overview',
  ];

  const quickQuestions = [
    {
      id: 1,
      question: 'What is the primary difference between props and state in React?',
      answer:
        'Props (short for properties) are read-only inputs passed into a component from its parent, used to configure or pass data down. State is managed internally within a component and can change over time in response to user actions or network responses.',
    },
    {
      id: 2,
      question: 'Why is JavaScript considered case-sensitive when naming variables and function calls?',
      answer:
        'JavaScript treats uppercase and lowercase letters as distinct characters. For example, `onClose` and `onclose` refer to two entirely different identifiers in memory, which is why mismatched casing results in `undefined` errors.',
    },
    {
      id: 3,
      question: 'How do you destructure props in a functional React component?',
      answer:
        'You destructure props directly inside the function parameter list using curly braces. For example: `const MyComponent = ({ isOpen, onClose }) => { ... }`.',
    },
    {
      id: 4,
      question:
        'What happens if you pass a prop as camelCase (e.g., `onClose`) but access it in lowercase (`onclose`)?',
      answer:
        'Because JavaScript is case-sensitive, accessing `onclose` inside the component will return `undefined` because the prop was stored on the props object under the key `onClose`.',
    },
    {
      id: 5,
      question: 'What is the purpose of the `useState` hook in React?',
      answer:
        '`useState` allows functional components to hold and update local state. It returns an array with two elements: the current state value and a function to update that value.',
    },
    {
      id: 6,
      question: 'How do you conditionally render a component in React using short-circuit evaluation (`&&`)?',
      answer:
        'You evaluate a boolean expression before the component using `&&`. For example: `{isOpen && <ProfileCard />}` will only render `<ProfileCard />` if `isOpen` evaluates to `true`.',
    },
    {
      id: 7,
      question: 'What is the difference between passing `onClick={handleClick}` versus `onClick={handleClick()}`?',
      answer:
        '`onClick={handleClick}` passes the function reference to be executed later when the click event happens. `onClick={handleClick()}` invokes the function immediately during component rendering and passes its return value to `onClick`.',
    },
    {
      id: 8,
      question: 'What value does an uninitialized or missing prop evaluate to inside a component?',
      answer: 'If a prop is expected by a component but not passed by the parent, its value defaults to `undefined`.',
    },
    {
      id: 9,
      question: 'How does the `useEffect` hook handle dependencies, and what causes it to re-run?',
      answer:
        '`useEffect` runs after every render if no dependency array is passed. If an empty array `[]` is passed, it runs once on mount. If dependencies are specified `[a, b]`, it re-runs whenever any of those values change between renders.',
    },
    {
      id: 10,
      question: 'What is component re-rendering, and what primary triggers cause it?',
      answer:
        "Re-rendering is the process where React executes a component function again to compute new UI JSX. It is primarily triggered by changes to the component's state or props, or a parent component re-rendering.",
    },
    {
      id: 11,
      question: 'How do you pass data from a child component back up to a parent component?',
      answer:
        'The parent component passes a callback function as a prop to the child. When an event occurs, the child invokes this callback function with the data as an argument.',
    },
    {
      id: 12,
      question: 'What is the role of `key` props when rendering lists in React?',
      answer:
        '`key` props provide a unique identity to list items so React can efficiently track, reorder, add, or remove items in the Virtual DOM without re-rendering the entire list.',
    },
    {
      id: 13,
      question: 'What is a controlled component in React forms?',
      answer:
        'A controlled component is an input element whose value is bound to React state, and updates are handled via an `onChange` callback that updates that state.',
    },
    {
      id: 14,
      question: 'How does optional chaining (`?.`) help prevent runtime errors when invoking prop functions?',
      answer:
        "Optional chaining checks if a function exists before invoking it (e.g., `onClose?.()`). If `onClose` is `undefined` or `null`, the code skips execution instead of throwing a 'TypeError: onClose is not a function'.",
    },
    {
      id: 15,
      question: 'What is the Virtual DOM, and how does React use it to optimize updates?',
      answer:
        'The Virtual DOM is a lightweight, in-memory representation of the real DOM. React compares the new Virtual DOM with the previous one (a process called reconciliation) and updates only the changed elements in the actual DOM.',
    },
    {
      id: 16,
      question: 'What is the difference between named exports and default exports in ES6 modules?',
      answer:
        'A module can have only one `default` export, which can be imported without curly braces using any name. A module can have multiple `named` exports, which must be imported using their exact names wrapped in curly braces `{}`.',
    },
    {
      id: 17,
      question: 'Why should you never mutate state directly in React (e.g., `state.count = 5`)?',
      answer:
        "Direct mutation modifies the object in memory without triggering React's reconciliation process, causing the UI to fail to update and leading to unpredictable component behavior.",
    },
    {
      id: 18,
      question: 'What is the purpose of `React.memo`?',
      answer:
        "`React.memo` is a higher-order component that performance-optimizes functional components by skipping re-renders if the component's props have not changed.",
    },
    {
      id: 19,
      question: 'How do default props or default parameter values work in JavaScript functional components?',
      answer:
        'Default values can be assigned directly in the function arguments during destructuring (e.g., `({ isOpen = false }) => ...`). If the prop is passed as `undefined`, the default value will be used.',
    },
    {
      id: 20,
      question: 'What is prop drilling, and what tools or patterns can be used to avoid it?',
      answer:
        'Prop drilling is the process of passing props through multiple levels of nested components that do not need the data themselves. It can be avoided using React Context API, custom hooks, or state management libraries like Redux or Zustand.',
    },
  ];
  return (
    <div className="bg-[#f2f3f7] w-full h-screen flex items-center justify-center text-gray-700 font-sans">
      {/* Main Window Container */}
      <div className="w-full  h-screen bg-[#f8f9fc] rounded-3xl shadow-2xl border border-white/60 flex flex-col overflow-hidden">
        {/* Main Content Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
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
                  <ul className="space-y-1">
                    <li>
                      <a
                        href="#"
                        className="block px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 hover:bg-white/50 rounded-lg truncate"
                      >
                        What's something you've learned...
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 hover:bg-white/50 rounded-lg truncate"
                      >
                        If you could teleport anywhere...
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 hover:bg-white/50 rounded-lg truncate"
                      >
                        What's one goal you want to ac...
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="block px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 hover:bg-white/50 rounded-lg truncate"
                      >
                        Ask me anything weird or rand...
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 hover:bg-white/50 rounded-lg truncate"
                      >
                        How are you feeling today, real...
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 hover:bg-white/50 rounded-lg truncate"
                      >
                        What's one habit you wish you...
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Profile Card */}
            <div
              onClick={() => setIsProfileOpen(true)}
              className="bg-white/80 border border-gray-200/80 rounded-xl p-2 flex items-center justify-between shadow-sm"
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
              {/* <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-tr from-indigo-300 via-purple-200 to-pink-200 shadow-lg shadow-indigo-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] rounded-full"></div>
                <div className="w-6 h-6 bg-white/60 rounded-full blur-[2px] absolute top-2 left-3"></div>
              </div> */}

              {/* Greeting */}
              {/* <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 tracking-tight">
                Good Morning, Judha
                <br />
                <span className="text-gray-800">How Can I </span>
                <span className="text-indigo-600">Assist You Today?</span>
              </h1> */}

              <div className="w-full max-w-3xl mb-24 flex flex-col gap-6">
                {/* Scrollable Container with Hidden Scrollbar */}
                <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto scrollbar-hide pr-1">
                  {quickQuestions.map((obj, index) => (
                    <div key={obj.id || index} className="flex flex-col gap-3">
                      {/* User Question (Right Aligned) */}
                      <div className="flex items-start justify-end gap-3">
                        <div className="bg-indigo-600 text-white rounded-2xl px-4 py-3 shadow-md max-w-[80%]">
                          <p className="text-sm font-medium">{obj.question}</p>
                        </div>
                      </div>

                      {/* AI Answer (Left Aligned) */}
                      <div className="flex items-start justify-start gap-3">
                        <div className="bg-white/80 border border-indigo-100 rounded-2xl px-4 py-3 shadow-sm max-w-[80%] backdrop-blur-sm">
                          <p className="text-sm text-gray-700 leading-relaxed">{obj.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prompt Box */}
              <div className="w-full bg-white/70 backdrop-blur-md border border-indigo-100 rounded-2xl p-4 shadow-xl shadow-indigo-500/5 absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 max-w-3xl">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <textarea
                    placeholder="Initiate a query or send a command to the AI..."
                    className="w-full bg-transparent border-none text-xs md:text-sm text-gray-700 placeholder-gray-400 focus:outline-none resize-none h-8"
                  ></textarea>
                </div>

                {/* Bottom Actions Bar */}
                <div className="flex items-center justify-between border-t border-gray-100/60 pt-3">
                  {/* Feature Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Paperclip className="w-4 h-4" />
                    </button>

                    <button className="flex items-center gap-1 px-2.5 py-1 bg-gray-100/80 hover:bg-gray-200/80 rounded-lg text-[11px] font-medium text-gray-600 transition">
                      <ImageIcon className="w-3 h-3 text-gray-500" />
                      <span>Create Image</span>
                    </button>
                  </div>

                  {/* Submit / Voice Action Button */}
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 bg-indigo-500 active:scale-95 hover:bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-md shadow-indigo-200 transition">
                      <Mic className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-7 h-7 active:scale-95 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-md shadow-indigo-200 transition">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
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

            {/* Recent Chats Section */}
            <div className="mt-2">
              <p className="mb-4 text-xs text-gray-400 font-normal">Recent chats</p>

              {/* List Items */}
              <div className="space-y-3">
                {recentChats.map((chat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-500 hover:text-black cursor-pointer transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="truncate">{chat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Profilecard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      </div>
    </div>
  );
}
