import { useEffect, useState } from "react";
import axios from "../utils/axios";

const TodayMenu = () => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("/menu");

      if (res.data.length > 0) {
        setMenu(res.data[0]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 max-w-7xl mx-auto w-full">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">
        Today's Menu 🍽️
      </h1>

      {loading ? (
        <p className="text-slate-500 font-bold text-sm">Loading...</p>
      ) : !menu ? (
        <div className="bg-white border border-slate-200/85 rounded-2xl p-6 shadow-sm font-bold text-slate-500">
          No Menu Available
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/85 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-150">
            <h2 className="text-2xl font-bold text-amber-600 mb-4 tracking-tight">
              🌞 Breakfast
            </h2>

            <p className="text-slate-655 text-sm font-semibold leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100">
              {menu.breakfast.join(", ")}
            </p>
          </div>

          <div className="bg-white border border-slate-200/85 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-150">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4 tracking-tight">
              ☀️ Lunch
            </h2>

            <p className="text-slate-655 text-sm font-semibold leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100">
              {menu.lunch.join(", ")}
            </p>
          </div>

          <div className="bg-white border border-slate-200/85 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-150">
            <h2 className="text-2xl font-bold text-fuchsia-600 mb-4 tracking-tight">
              🌙 Dinner
            </h2>

            <p className="text-slate-655 text-sm font-semibold leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100">
              {menu.dinner.join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayMenu;