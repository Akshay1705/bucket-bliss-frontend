import { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 relative">
      {/* Top-right Login/Register */}
      <div className="absolute top-4 right-6 flex gap-4">
        <Link
          to="/login"
          className="bg-white text-blue-600 px-4 py-1 rounded font-semibold border border-blue-500 hover:bg-blue-500 hover:text-white transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-1 rounded font-semibold hover:bg-blue-700 transition"
        >
          Register
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center p-6 pt-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to WishCraft 🎯
        </h1>

        <p className="text-lg font-medium text-gray-700 mb-6">
          {moodQuotes[mood]}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.keys(moodQuotes).map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`px-4 py-2 rounded-full border font-semibold text-sm ${
                mood === m
                  ? "bg-blue-600 text-white border-black"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Updated Button → to /login */}
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Start Your Journey 🚀
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
