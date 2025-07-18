import React from 'react';
import Button from './Button';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-green-900 text-white">
      <div className="text-2xl font-bold">Remember</div>
      <div className="flex items-center space-x-4">
        <Button
          text={'Login'}
          className="bg-green-600 hover:bg-green-700 active:bg-green-600 text-white font-semibold px-4 py-2 rounded transition"
        />
        <button
          aria-label="Profile"
          className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold hover:bg-green- transition"
        >
          Hi
        </button>
      </div>
    </nav>
  );
}
