function Sidebar({ onLogout, onViewWishes, onAddWish }) {
  const userName = localStorage.getItem("bucketBlissUserName") || "Dreamer";

  return (
    <div className="w-56 bg-gray-50 h-screen sticky top-0 flex flex-col justify-between p-4 border-r">
      <div>
        {/* Logo at Top */}
        <div className="flex items-center justify-center mb-4">
          <img
            src="/logo.png"
            alt="WishCraft Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        <button
          onClick={onViewWishes}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 mb-3 rounded transition"
        >
          View Wishes
        </button>

        <button
          onClick={onAddWish}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
        >
          + Add Wish
        </button>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-3 font-medium text-center">
          👤 {userName}
        </p>

        <button
          onClick={() => {
            onLogout();
            window.location.href = "/";
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
