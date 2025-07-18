function Sidebar({ onLogout, onViewWishes, onAddWish }) {
  const userName = localStorage.getItem("bucketBlissUserName") || "User";

  return (
    <div className="w-56 bg-gray-100 h-screen sticky top-0 flex flex-col justify-between p-4">
      <div>
        <h3 className="text-lg font-bold mb-4">Bucket Bliss</h3>
        <button
          onClick={onViewWishes}
          className="block w-full bg-blue-500 text-white px-4 py-2 mb-2 rounded"
        >
          View All Wishes
        </button>
        <button
          onClick={onAddWish}
          className="block w-full bg-green-500 text-white px-4 py-2 mb-2 rounded"
        >
          Add Wish
        </button>
      </div>

      <div>
        <p className="flex items-center text-sm text-gray-600 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-blue-500 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A9 9 0 1119.878 4.121 9 9 0 015.121 17.804z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="ml-1 font-semibold text-gray-800">{userName}</span>
        </p>
        <button
          onClick={() => {
            onLogout();
            window.location.href = "/"; // redirect after logout
          }}
          className="w-full bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
