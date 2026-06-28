import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaCommentDots,
  FaStar,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
  students: 0,
  complaints: 0,
  reviews: 0,
  meals: 0,
});

useEffect(() => {
  fetchStats();
}, []);

const fetchStats = async () => {
  try {
    const res = await axios.get("/dashboard");
    setStats(res.data);
  } catch (err) {
    console.log(err);
  }
};

return (
  <div className="min-h-screen bg-slate-50 text-slate-800 flex">

    {/* Sidebar */}
    <div className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col justify-between">

      <div>
        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-violet-600 tracking-tight">
            DineFlow
          </h1>

          <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-wider">
            Admin Panel
          </p>
        </div>

        <div className="px-4 space-y-2">

          <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-violet-600 text-white font-bold shadow-sm cursor-pointer hover:scale-[1.02] duration-150">
            <FaHome />
            Dashboard
          </button>

<button
  onClick={() => navigate("/manage-menu")}
  className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition duration-150 cursor-pointer"
>
  <FaUtensils />
  Manage Menu
</button>


       <button
  onClick={() => navigate("/manage-complaints")}
  className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition duration-150 cursor-pointer"
>
  <FaCommentDots />
  Complaints
</button>

           <button
  onClick={() => navigate("/admin/reviews")}
  className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition duration-150 cursor-pointer"
>
  <FaStar />
  Manage Reviews
</button>
           
      
<button
  onClick={() => navigate("/students")}
  className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition duration-150 cursor-pointer"
>
  <FaUsers />
  Students
</button>

        </div>
      </div>

      <div className="p-5 border-t border-slate-200">

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

      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
        Welcome Admin 👋
      </h1>

      <p className="text-slate-505 mt-2 text-sm font-semibold">
        Manage students, menu, complaints and reviews from one place.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">


        

  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-200 cursor-default">
    <FaUsers className="text-4xl text-violet-650 mb-4" />
    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
  {stats.students}
</h2>
    <p className="text-slate-500 text-xs font-semibold mt-2">
      Total Students
    </p>
  </div>

  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-200 cursor-default">
    <FaCommentDots className="text-4xl text-amber-600 mb-4" />
   <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
  {stats.complaints}
</h2>
    <p className="text-slate-500 text-xs font-semibold mt-2">
      Total Complaints
    </p>
  </div>

  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-200 cursor-default">
    <FaStar className="text-4xl text-emerald-600 mb-4" />
   <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
  {stats.reviews}
</h2>
    <p className="text-slate-500 text-xs font-semibold mt-2">
      Total Reviews
    </p>
  </div>

  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-200 cursor-default">
    <FaUtensils className="text-4xl text-fuchsia-600 mb-4" />
    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
  {stats.meals}
</h2>
    <p className="text-slate-500 text-xs font-semibold mt-2">
      Meals Today
    </p>
  </div>

</div>
<div className="mt-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">

  <div className="flex justify-between items-center mb-5">
    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
      Recent Complaints
    </h2>

    <button className="text-violet-600 hover:text-violet-500 font-bold transition text-sm cursor-pointer">
      View All
    </button>
  </div>

  <div className="overflow-x-auto">

    <table className="w-full border-collapse">

      <thead>

        <tr className="border-b border-slate-200 text-left text-slate-500 text-xs uppercase tracking-wider font-bold bg-slate-50/50">

          <th className="py-3.5 px-4">Student</th>

          <th className="py-3.5 px-4">Subject</th>

          <th className="py-3.5 px-4">Status</th>

          <th className="py-3.5 px-4">Date</th>

        </tr>

      </thead>

      <tbody>

        <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition">

          <td className="py-4 px-4 text-sm font-semibold text-slate-700">Shweta</td>

          <td className="py-4 px-4 text-sm text-slate-600 font-medium">Food Quality</td>

          <td className="py-4 px-4 text-sm">
            <span className="bg-amber-50 text-amber-705 border border-amber-100/60 px-3 py-1 rounded-full text-xs font-bold">
              Pending
            </span>
          </td>

          <td className="py-4 px-4 text-sm text-slate-500 font-medium">26 Jun</td>

        </tr>

        <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition">

          <td className="py-4 px-4 text-sm font-semibold text-slate-700">Rahul</td>

          <td className="py-4 px-4 text-sm text-slate-600 font-medium">Late Dinner</td>

          <td className="py-4 px-4 text-sm">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100/60 px-3 py-1 rounded-full text-xs font-bold">
              Resolved
            </span>
          </td>

          <td className="py-4 px-4 text-sm text-slate-500 font-medium">25 Jun</td>

        </tr>

      </tbody>

    </table>

  </div>

</div>

    </div>

  </div>
  
);
};

export default AdminDashboard;