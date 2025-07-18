function FilterBar({
  categories,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
}) {
  const statusOptions = ["All", "Completed", "Pending", "Expired"];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6 transition-all">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search wishes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <p className="font-semibold text-gray-700 mb-2">
          🎨 Filter by Category:
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setCategoryFilter(cat.name)}
              className={`px-3 py-1 rounded-full font-medium text-sm border transition ${
                categoryFilter === cat.name
                  ? `${cat.color} border-black scale-105`
                  : "bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCategoryFilter("Other")}
            className={`px-3 py-1 rounded-full font-medium text-sm border ${
              categoryFilter === "Other"
                ? "bg-orange-200 text-orange-800 border-black scale-105"
                : "bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300"
            }`}
          >
            Other
          </button>

          <button
            type="button"
            onClick={() => setCategoryFilter("All")}
            className={`px-3 py-1 rounded-full font-medium text-sm border ${
              categoryFilter === "All"
                ? "bg-blue-600 text-white border-black scale-105"
                : "bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300"
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <p className="font-semibold text-gray-700 mb-2">📊 Filter by Status:</p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-full font-medium text-sm border ${
                statusFilter === status
                  ? status === "Expired"
                    ? "bg-red-500 text-white border-black scale-105"
                    : "bg-blue-500 text-white border-black scale-105"
                  : "bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
