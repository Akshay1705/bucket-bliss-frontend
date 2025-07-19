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
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-200 flex flex-col items-center justify-center font-sans overflow-hidden relative">
      {/* Top Navigation */}
      <div className="absolute top-6 right-8 flex gap-4">
        <Link
          to="/login"
          className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold border border-indigo-500 shadow hover:bg-indigo-600 hover:text-white transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
        >
          Register
        </Link>
      </div>

      {/* Main Content */}
      <div className="text-center px-4">
        <motion.h1
          className="text-5xl font-extrabold text-gray-800 drop-shadow mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to <span className="text-indigo-600">WishCraft</span> 🎯
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700 font-medium mb-8 max-w-xl mx-auto"
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
              className={`px-4 py-2 rounded-full border font-semibold text-sm shadow transition ${
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
