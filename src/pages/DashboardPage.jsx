import Sidebar from "../components/Sidebar";
import StatusBar from "../components/StatusBar";
import WishList from "../components/WishList";
import AddWishForm from "../components/AddWishForm";
import FilterBar from "../components/FilterBar";
import { useEffect, useState, useCallback } from "react";
import {
  fetchWishes,
  addWish,
  updateWish,
  deleteWish,
} from "../services/wishService";
import { getToken, logoutUser } from "../services/authService";

function DashboardPage() {
  const [allWishes, setAllWishes] = useState([]);
  const [view, setView] = useState("view");
  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const categories = [
    { name: "Travel", color: "bg-blue-200 text-blue-800" },
    { name: "Health", color: "bg-green-200 text-green-800" },
    { name: "Career", color: "bg-yellow-200 text-yellow-800" },
    { name: "Finance", color: "bg-purple-200 text-purple-800" },
    { name: "Personal", color: "bg-pink-200 text-pink-800" },
  ];

  const loadWishes = useCallback(async () => {
    setLoading(true);
    const data = await fetchWishes(1, 9999);
    setAllWishes(data.wishes || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = "/";
    } else {
      loadWishes();
    }
  }, [loadWishes]);

  const handleAddWish = async (wish) => {
    await addWish(wish);
    await loadWishes();
    setView("view");
  };

  const handleMarkCompleted = async (wishId) => {
    await updateWish(wishId, { isCompleted: true });
    await loadWishes();
  };

  const handleDeleteWish = async (wishId) => {
    await deleteWish(wishId);
    await loadWishes();
  };

  const getFilteredWishes = () => {
    let filtered = [...allWishes];

    if (categoryFilter !== "All") {
      filtered = filtered.filter((wish) => {
        if (categoryFilter === "Other") {
          return !categories.some((cat) => cat.name === wish.category);
        }
        return wish.category === categoryFilter;
      });
    }

    if (statusFilter === "Completed") {
      filtered = filtered.filter((wish) => wish.isCompleted);
    } else if (statusFilter === "Pending") {
      filtered = filtered.filter(
        (wish) => !wish.isCompleted && new Date(wish.targetDate) >= new Date()
      );
    } else if (statusFilter === "Expired") {
      filtered = filtered.filter(
        (wish) => !wish.isCompleted && new Date(wish.targetDate) < new Date()
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((wish) =>
        wish.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredWishes = getFilteredWishes();
  const totalPages = Math.ceil(filteredWishes.length / itemsPerPage);

  const paginatedWishes = filteredWishes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const expiredCount = allWishes.filter(
    (w) => !w.isCompleted && new Date(w.targetDate) < new Date()
  ).length;

  const pendingCount = allWishes.filter(
    (w) => !w.isCompleted && new Date(w.targetDate) >= new Date()
  ).length;

  return (
    <div className="flex">
      <Sidebar
        userName="User"
        onLogout={() => {
          logoutUser();
          window.location.href = "/";
        }}
        onViewWishes={() => setView("view")}
        onAddWish={() => setView("add")}
      />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <StatusBar
          total={allWishes.length}
          completed={allWishes.filter((w) => w.isCompleted).length}
          pending={pendingCount}
          expired={expiredCount}
        />

        {view === "view" && (
          <>
            <FilterBar
              categories={categories}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {loading ? (
              <p className="text-center mt-10 text-gray-500">
                Loading wishes...
              </p>
            ) : (
              <>
                <WishList
                  wishes={paginatedWishes}
                  onMarkCompleted={handleMarkCompleted}
                  onDeleteWish={handleDeleteWish}
                />

                <div className="flex justify-center items-center mt-6 space-x-4">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      page === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-gray-700 font-medium">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      page === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {view === "add" && <AddWishForm onAddWish={handleAddWish} />}
      </div>
    </div>
  );
}

export default DashboardPage;
