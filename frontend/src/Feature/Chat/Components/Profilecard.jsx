import { Camera, LogOut, Plus, X } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

export default function Profilecard({ onClose, isOpen }) {
  const handleClose = () => {
    console.log('hollo');
    console.log(onClose);
    onClose();
  };
  return (
    <div
      className={`absolute bottom-13 left-12 z-50 w-full max-w-sm overflow-hidden rounded-[28px] bg-white p-6 text-gray-200 shadow-2xl border border-white/10 backdrop-blur-md ${isOpen ? 'block' : 'hidden'}`}
    >
      {/* Top Header: Email & Close Button */}
      <div className="flex items-center justify-between  gap-9 ">
        <div>
          <span className="text-sm font-medium  text-gray-500 pl-2">test@gmail.com</span>
        </div>

        <button
          onClick={handleClose}
          className="p-1 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Profile Avatar with Google Multi-color Gradient Border */}
      <div className="mt-6 flex flex-col items-center">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-indigo-500 border-2  p-[3px]">
            <div className="h-full w-full rounded-full bg-[#212121] p-[2px]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                alt="Profile Avatar"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Camera Icon Overlay */}
          <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full text-white bg-indigo-500 text-gray-500 border border-[#212121] hover:bg-indigo-400 transition-colors">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* User Name Greeting */}
        <h2 className="mt-3 text-1xl font-medium text-gray-800">username</h2>

        {/* Manage Google Account Button */}
        <button className="mt-4 w-full rounded-full active:scale-95 py-2.5 px-4 bg-indigo-500 text-sm font-medium text-[#eeeff0] hover:bg-indigo-400 hover:border-transparent transition-all">
          Manage your Google Account
        </button>
      </div>

      {/* Bottom Action Grid: Add Account & Sign Out */}
      <div className="mt-5 grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center active:scale-95 gap-2 rounded-2xl bg-indigo-500 py-3.5 px-3 text-sm font-medium text-white hover:bg-indigo-400 transition-colors">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
            <Plus className="h-4 w-4" />
          </div>
          <span>Add account</span>
        </button>

        <button className="flex items-center justify-center active:scale-95 gap-2 rounded-2xl bg-indigo-500 py-3.5 px-3 text-sm font-medium text-white hover:bg-indigo-400 transition-colors">
          <LogOut className="h-5 w-5 text-gray-300" />
          <span>Sign out</span>
        </button>
      </div>

      {/* Footer Links */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
        <a href="#privacy" className="hover:underline">
          Privacy Policy
        </a>
        <span>•</span>
        <a href="#terms" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </div>
  );
}
