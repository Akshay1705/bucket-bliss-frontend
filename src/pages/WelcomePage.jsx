/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const moodQuotes = {
  Happy: "Happiness is the fuel of dreams. ✨",
  Calm: "Stay calm. Wishing is the first step. 🌿",
  Motivated: "Your goals are waiting for you. 🚀",
  Neutral: "Every day is a fresh start. 🌄",
  Excited: "Let’s make today legendary! 🎉",
};

function WelcomePage() {
  const [mood, setMood] = useState("Happy");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-200 relative font-sans overflow-hidden">
      {/* Top Navigation */}
      <div className="absolute top-4 right-6 flex gap-4 z-10">
        <Link
          to="/login"
          className="bg-white text-indigo-600 px-4 py-1 rounded-xl font-semibold border border-indigo-500 shadow hover:bg-indigo-600 hover:text-white transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-indigo-600 text-white px-4 py-1 rounded-xl font-semibold shadow hover:bg-indigo-700 transition"
        >
          Register
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center p-6 pt-24">
        <motion.h1
          className="text-5xl font-extrabold text-gray-800 drop-shadow mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-indigo-600">WishCraft</span> 🎯
        </motion.h1>

        <motion.p
          className="text-xl font-medium text-gray-700 mb-8 max-w-xl"
          key={mood}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {moodQuotes[mood]}
        </motion.p>

        {/* Mood Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(moodQuotes).map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`px-4 py-2 rounded-full border font-semibold text-sm shadow transition-all duration-200 ease-in-out ${
                mood === m
                  ? "bg-indigo-600 text-white border-black scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:scale-105"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-indigo-700 transition"
          >
            Start Your Journey 🚀
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default WelcomePage;
