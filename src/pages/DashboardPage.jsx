import Sidebar from "../components/Sidebar";
import StatusBar from "../components/StatusBar";
import WishList from "../components/WishList";
import AddWishForm from "../components/AddWishForm";
import FilterBar from "../components/FilterBar";
import { useEffect, useState } from "react";
import {
  fetchWishes,
  addWish,
  updateWish,
  deleteWish,
} from "../services/wishService";
import { getToken, logoutUser } from "../services/authService";

function DashboardPage() {
  const [wishes, setWishes] = useState([]);
  const [view, setView] = useState("view");
  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Travel", color: "bg-blue-200 text-blue-800" },
    { name: "Health", color: "bg-green-200 text-green-800" },
    { name: "Career", color: "bg-yellow-200 text-yellow-800" },
    { name: "Finance", color: "bg-purple-200 text-purple-800" },
    { name: "Personal", color: "bg-pink-200 text-pink-800" },
  ];

  useEffect(() => {
    if (!getToken()) {
      window.location.href = "/";
    } else {
      loadWishes();
    }
  }, []);

  const loadWishes = async () => {
    setLoading(true);
    const data = await fetchWishes();
    setWishes(data);
    setLoading(false);
  };

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
    let filtered = [...wishes];

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
      filtered = filtered.filter((wish) => !wish.isCompleted);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((wish) =>
        wish.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const expiredCount = wishes.filter(
    (w) => !w.isCompleted && new Date(w.targetDate) < new Date()
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
          total={wishes.length}
          completed={wishes.filter((w) => w.isCompleted).length}
          pending={wishes.filter((w) => !w.isCompleted).length}
          expired={expiredCount}
        />

        {view === "view" && (
          <FilterBar
            categories={categories}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {loading ? (
          <p className="text-center mt-10 text-gray-500">Loading wishes...</p>
        ) : view === "add" ? (
          <AddWishForm onAddWish={handleAddWish} />
        ) : (
          <WishList
            wishes={getFilteredWishes()}
            onMarkCompleted={handleMarkCompleted}
            onDeleteWish={handleDeleteWish}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
