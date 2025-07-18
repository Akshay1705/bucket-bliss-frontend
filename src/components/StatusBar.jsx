function StatusBar({ total, completed, pending, expired }) {
  return (
    <div className="flex justify-between bg-white shadow-md rounded-xl p-4 mb-6 border border-gray-200 flex-wrap">
      <div className="flex-1 text-center min-w-[120px]">
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          Total Wishes
        </p>
        <p className="text-2xl font-bold text-blue-600">{total}</p>
      </div>

      <div className="flex-1 text-center min-w-[120px]">
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          Completed
        </p>
        <p className="text-2xl font-bold text-green-500">{completed}</p>
      </div>

      <div className="flex-1 text-center min-w-[120px]">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Pending</p>
        <p className="text-2xl font-bold text-yellow-500">{pending}</p>
      </div>

      <div className="flex-1 text-center min-w-[120px]">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Expired</p>
        <p className="text-2xl font-bold text-red-500">{expired}</p>
      </div>
    </div>
  );
}

export default StatusBar;
