import { format } from "date-fns";
import Swal from "sweetalert2";

function WishList({ wishes, onMarkCompleted, onDeleteWish }) {
  if (!wishes || wishes.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        No wishes yet... let your heart speak its first dream. 💫
      </p>
    );
  }

  const categoryColorMap = {
    Travel: "bg-blue-100 text-blue-700",
    Health: "bg-green-100 text-green-700",
    Career: "bg-yellow-100 text-yellow-700",
    Finance: "bg-purple-100 text-purple-700",
    Personal: "bg-pink-100 text-pink-700",
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This wish will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteWish(id);
        Swal.fire("Deleted!", "Your wish has been deleted.", "success");
      }
    });
  };

  const isExpired = (wish) => {
    return !wish.isCompleted && new Date(wish.targetDate) < new Date();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishes
        .sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate))
        .map((wish) => {
          const categoryColor =
            categoryColorMap[wish.category] || "bg-gray-100 text-gray-700";

          const expired = isExpired(wish);

          return (
            <div
              key={wish._id}
              className="relative rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition duration-200 p-5"
            >
              <button
                onClick={() => handleDelete(wish._id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
                title="Delete Wish"
              >
                ✖️
              </button>

              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryColor}`}
              >
                {wish.category}
              </div>

              {wish.tags && wish.tags.length > 0 && (
                <div className="mb-3">
                  {wish.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full mr-2 mb-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {wish.title}
              </h3>

              <p className="text-sm text-gray-500 mb-1">
                🎯 Target: {format(new Date(wish.targetDate), "dd-MM-yyyy")}
              </p>

              <p
                className={`text-sm font-semibold mb-4 ${
                  wish.isCompleted
                    ? "text-green-600"
                    : expired
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {wish.isCompleted
                  ? "Completed ✅"
                  : expired
                  ? "Expired ❌"
                  : "Pending ⏳"}
              </p>

              {!wish.isCompleted && !expired && (
                <button
                  onClick={() => onMarkCompleted(wish._id)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default WishList;
