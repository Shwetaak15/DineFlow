import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import {
  FaUtensils,
  FaCommentDots,
  FaStar,
  FaClipboardList,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

const StudentDashboard = () => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeComplaints, setActiveComplaints] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const navigate = useNavigate();

  const fetchMenu = async () => {
    try {
      const res = await axios.get("/menu");

      if (Array.isArray(res.data) && res.data.length > 0) {
        setMenu(res.data[0]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [complaintsRes, reviewsRes] = await Promise.all([
        axios.get("/complaints/my"),
        axios.get("/reviews/my"),
      ]);

      setActiveComplaints(
        complaintsRes.data.filter((c) => c.status !== "Resolved").length
      );
      setReviewCount(reviewsRes.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchStats();
  }, []);

  const mealsAvailable = menu
    ? [menu.breakfast, menu.lunch, menu.dinner].filter(
        (meal) => Array.isArray(meal) && meal.length > 0
      ).length
    : 0;

  return (
    <div className="h-screen bg-slate-50 text-slate-800 flex overflow-hidden">

      {/* Sidebar */}

      <div className="w-60 bg-white border-r border-slate-200 hidden lg:flex flex-col h-full">

        <div className="flex-1 overflow-y-auto">

          <div className="p-5">
            <h1 className="text-3xl font-extrabold text-violet-600 tracking-tight">
              DineFlow
            </h1>
          </div>

          <div className="px-3 space-y-2">

            <button
              onClick={() => navigate("/student-dashboard")}
              className="flex items-center gap-3 w-full p-3 rounded-xl bg-violet-600 text-white font-bold shadow-sm cursor-pointer hover:scale-[1.02] duration-150"
            >
              <FaHome />
              Dashboard
            </button>

            <button
              onClick={() => navigate("/today-menu")}
              className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition-all duration-150 cursor-pointer"
            >
              <FaUtensils />
              Today's Menu
            </button>

            <button
              onClick={() => navigate("/complaints")}
              className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition-all duration-150 cursor-pointer"
            >
              <FaCommentDots />
              Complaints
            </button>

            <button
              onClick={() => navigate("/review")}
              className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition-all duration-150 cursor-pointer"
            >
              <FaStar />
              Reviews
            </button>

            <button
              onClick={() => navigate("/my-activity")}
              className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition-all duration-150 cursor-pointer"
            >
              <FaClipboardList />
              My Activity
            </button>

          </div>

        </div>

        <div className="p-3 border-t border-slate-200 mt-auto">

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="flex items-center gap-3 w-full p-3 rounded-xl text-red-655 hover:bg-red-50 transition font-bold text-sm cursor-pointer"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

      {/* Main Content */}

      <div className="flex-1 p-8 overflow-y-auto">
              {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back 👋
            </h1>

            <p className="text-slate-500 mt-1 text-sm font-semibold">
              Here's an overview of your dining activities.
            </p>

          </div>

          <div className="bg-violet-50 border border-violet-100 text-violet-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm">
            {new Date().toLocaleDateString()}
          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-5 mb-6">

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-200 cursor-default">

            <div className="flex justify-between items-center">

              <FaUtensils
                size={24}
                className="text-violet-600"
              />

              <span className="text-slate-500 font-bold text-sm">
                Today's Menu
              </span>

            </div>

            <h2 className="text-4xl font-extrabold text-slate-905 mt-3 tracking-tight">
              {mealsAvailable}
            </h2>

            <p className="text-slate-400 text-xs font-semibold mt-1">
              Meals Available
            </p>

          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-200 cursor-default">

            <div className="flex justify-between items-center">

              <FaCommentDots
                size={24}
                className="text-violet-600"
              />

              <span className="text-slate-500 font-bold text-sm">
                Complaints
              </span>

            </div>

            <h2 className="text-4xl font-extrabold text-slate-905 mt-3 tracking-tight">
              {activeComplaints}
            </h2>

            <p className="text-slate-400 text-xs font-semibold mt-1">
              Active Complaints
            </p>

          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-200 cursor-default">

            <div className="flex justify-between items-center">

              <FaStar
                size={24}
                className="text-violet-600"
              />

              <span className="text-slate-500 font-bold text-sm">
                Reviews
              </span>

            </div>

            <h2 className="text-4xl font-extrabold text-slate-905 mt-3 tracking-tight">
              {reviewCount}
            </h2>

            <p className="text-slate-400 text-xs font-semibold mt-1">
              Reviews Submitted
            </p>

          </div>

        </div>

        {/* Content */}

        <div className="space-y-5">
                  {/* Today's Menu */}

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.005] transition-all duration-200">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Today's Menu 🍽️
              </h2>

              <button
                onClick={() => navigate("/today-menu")}
                className="bg-violet-600 hover:bg-violet-755 px-4 py-2 rounded-xl text-sm text-white font-bold shadow-sm transition hover:scale-[1.02] active:scale-[0.98] duration-150 cursor-pointer"
              >
                View Full Menu
              </button>

            </div>

            {loading ? (

              <p className="text-slate-500 font-semibold">Loading Menu...</p>

            ) : !menu ? (

              <p className="text-slate-500 font-semibold">No Menu Available</p>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-xl shadow-sm">

                  <h3 className="text-base font-bold text-slate-800 mb-2">
                    🌞 Breakfast
                  </h3>

                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {Array.isArray(menu.breakfast)
                      ? menu.breakfast.join(", ")
                      : menu.breakfast}
                  </p>

                </div>

                <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-xl shadow-sm">

                  <h3 className="text-base font-bold text-slate-800 mb-2">
                    ☀️ Lunch
                  </h3>

                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {Array.isArray(menu.lunch)
                      ? menu.lunch.join(", ")
                      : menu.lunch}
                  </p>

                </div>

                <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-xl shadow-sm">

                  <h3 className="text-base font-bold text-slate-800 mb-2">
                    🌙 Dinner
                  </h3>

                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {Array.isArray(menu.dinner)
                      ? menu.dinner.join(", ")
                      : menu.dinner}
                  </p>

                </div>

              </div>

            )}

          </div>

          {/* Lower Widgets */}
                    {/* Lower Widgets */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Quick Actions */}

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200">

              <div>

                <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
                  Quick Actions
                </h2>

              </div>

              <div className="space-y-3 mt-4">

                <button
                  onClick={() => navigate("/complaints")}
                  className="w-full bg-violet-600 hover:bg-violet-755 py-3 rounded-xl mb-3 text-white font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer text-center flex justify-center items-center"
                >
                  Raise Complaint
                </button>

                <button
                  onClick={() => navigate("/review")}
                  className="w-full border border-slate-250 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-bold transition shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-150 cursor-pointer text-center flex justify-center items-center"
                >
                  Write Review
                </button>

                <button
                  onClick={() => navigate("/my-complaints")}
                  className="w-full border border-slate-250 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-bold transition shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-150 cursor-pointer text-center flex justify-center items-center"
                >
                  My Complaints
                </button>

              </div>

            </div>

            {/* Notice Board */}

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">

              <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
                📢 Notice Board
              </h2>

              <div className="bg-amber-50/50 border border-amber-100/70 rounded-xl p-4 flex-1 flex flex-col justify-center">

                <p className="font-bold mb-2 text-amber-800 text-sm">
                  Holiday Notice
                </p>

                <p className="text-xs text-amber-705 leading-relaxed font-semibold">
                  Mess timings may change during holidays.
                  Please check updates regularly.
                </p>

              </div>

            </div>
                        {/* Mess Timings */}

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">

              <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
                ⏰ Mess Timings
              </h2>

              <div className="space-y-3 text-sm flex-1 flex flex-col justify-center">

                <div className="flex justify-between py-2 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-bold text-sm">Breakfast</span>
                  <span className="font-bold text-violet-650">
                    08:00 AM
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-bold text-sm">Lunch</span>
                  <span className="font-bold text-violet-650">
                    12:30 PM
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-bold text-sm">Dinner</span>
                  <span className="font-bold text-violet-650">
                    07:30 PM
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
  export default StudentDashboard;