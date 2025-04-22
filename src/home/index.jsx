import React from 'react';
import Header from '@/components/custom/Header';
import { UserButton } from '@clerk/clerk-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Build Your Resume Smarter with AI
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
          Create stunning, ATS-friendly resumes in minutes with our AI-powered resume builder.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow hover:bg-indigo-700 transition-all duration-200">
            Get Started
          </button>
          <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-all duration-200">
            Learn More
          </button>
        </div>
      </main>

      <footer className="p-4 text-center text-gray-400 text-sm">
        <UserButton afterSignOutUrl="/" />
        <p>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
