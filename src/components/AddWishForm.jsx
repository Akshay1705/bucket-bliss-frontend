import { useState } from "react";
import toast from "react-hot-toast";

function AddWishForm({ onAddWish }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const categories = [
    { name: "Travel", color: "bg-blue-200 text-blue-800" },
    { name: "Health", color: "bg-green-200 text-green-800" },
    { name: "Career", color: "bg-yellow-200 text-yellow-800" },
    { name: "Finance", color: "bg-purple-200 text-purple-800" },
    { name: "Personal", color: "bg-pink-200 text-pink-800" },
    { name: "Other", color: "bg-gray-300 text-gray-800" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category) {
      toast.error("Please select a category!");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(targetDate);

    if (selectedDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      toast.error(
        "Target Date cannot be in the past. Please select a future date."
      );
      return;
    }

    onAddWish({
      title,
      category,
      targetDate,
    });
    // Reset Form
    setTitle("");
    setCategory("");
    setTargetDate("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-6 text-center text-blue-600">
        Add New Wish 🎯
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Wish Title
          </label>
          <input
            type="text"
            placeholder="E.g. Visit Japan"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setCategory(cat.name)}
                className={`px-3 py-1 rounded-full font-medium text-sm border ${
                  category === cat.name
                    ? `${cat.color} border-black`
                    : "bg-gray-200 text-gray-700 border-transparent"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Target Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Add Wish
        </button>
      </form>
    </div>
  );
}

export default AddWishForm;
