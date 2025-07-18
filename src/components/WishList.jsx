import { format } from "date-fns";
import Swal from "sweetalert2";

function WishList({ wishes, onMarkCompleted, onDeleteWish }) {
  if (!wishes || wishes.length === 0) {
    return <p className="text-gray-600">No wishes found yet. 🫤</p>;
  }

  const categoryColorMap = {
    Travel: "bg-blue-200 text-blue-800",
    Health: "bg-green-200 text-green-800",
    Career: "bg-yellow-200 text-yellow-800",
    Finance: "bg-purple-200 text-purple-800",
    Personal: "bg-pink-200 text-pink-800",
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {wishes
        .sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate))
        .map((wish) => {
          const categoryColor =
            categoryColorMap[wish.category] || "bg-gray-200 text-gray-800";

          const expired = isExpired(wish);

          return (
            <div
              key={wish._id}
              className="relative border border-gray-300 rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              <button
                onClick={() => handleDelete(wish._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                title="Delete Wish"
              >
                ✖️
              </button>

              <div
                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${categoryColor}`}
              >
                {wish.category}
              </div>

              {wish.tags && wish.tags.length > 0 && (
                <div className="mb-2">
                  {wish.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full mr-1 mb-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <h3 className="font-semibold text-lg mb-2">{wish.title}</h3>

              <p className="text-sm text-gray-600 mb-1">
                Target Date: {format(new Date(wish.targetDate), "dd-MM-yyyy")}
              </p>

              <p
                className={`text-sm font-semibold mb-3 ${
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
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm w-full"
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
