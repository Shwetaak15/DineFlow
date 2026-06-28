import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axios";

const ManageMenu = () => {
  const [menus, setMenus] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    day: "",
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  const fetchMenus = async () => {
    try {
      const res = await axios.get("/menu");
      setMenus(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const menuData = {
      day: formData.day,
      breakfast: formData.breakfast
        .split(",")
        .map((item) => item.trim()),

      lunch: formData.lunch
        .split(",")
        .map((item) => item.trim()),

      dinner: formData.dinner
        .split(",")
        .map((item) => item.trim()),
    };

    if (editingId) {
      await axios.put(`/menu/${editingId}`, menuData);
    } else {
      await axios.post("/menu", menuData);
    }

    setFormData({
      day: "",
      breakfast: "",
      lunch: "",
      dinner: "",
    });

    setEditingId(null);

    fetchMenus();

toast.success(
  editingId
    ? "Menu Updated Successfully 🎉"
    : "Menu Added Successfully 🎉"
);
  } catch (error) {
    console.log(error);

toast.error("Failed to save menu");
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this menu?"
  );

  if (!confirmDelete) return;

  try {
   await axios.delete(`/menu/${id}`);

fetchMenus();

toast.success("Menu Deleted Successfully 🗑️");
  } catch (error) {
    console.log(error);

toast.error("Failed to delete menu");
  }
};

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 max-w-7xl mx-auto w-full">

      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
        Manage Menu
      </h1>

      <p className="text-slate-500 mt-2 mb-8 text-sm font-semibold">
        Add and manage hostel meals.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm"
      >

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            name="day"
            placeholder="Day"
            value={formData.day}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-350 text-slate-800 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
          />

          <input
            type="text"
            name="breakfast"
            placeholder="Breakfast (comma separated)"
            value={formData.breakfast}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-350 text-slate-800 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
          />

          <input
            type="text"
            name="lunch"
            placeholder="Lunch (comma separated)"
            value={formData.lunch}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-350 text-slate-800 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
          />

          <input
            type="text"
            name="dinner"
            placeholder="Dinner (comma separated)"
            value={formData.dinner}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-350 text-slate-800 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
          />

        </div>

        <div className="mt-6 flex gap-4">

  <button
    type="submit"
    className="bg-violet-600 hover:bg-violet-755 px-6 py-3 rounded-xl text-white font-bold transition shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-150 cursor-pointer"
  >
    {editingId ? "Update Menu" : "Add Menu"}
  </button>

  {editingId && (
    <button
      type="button"
      onClick={() => {
        setEditingId(null);

        setFormData({
          day: "",
          breakfast: "",
          lunch: "",
          dinner: "",
        });
      }}
      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold transition shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-150 cursor-pointer"
    >
      Cancel
    </button>
  )}

</div>

      </form>
            <div className="mt-8 bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">

        <div className="p-5 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Weekly Menu
          </h2>
        </div>

        {menus.length === 0 ? (

          <div className="p-8 text-center text-slate-400 font-semibold">
            No Menu Available
          </div>

        ) : (

          <table className="w-full border-collapse">

            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold border-b border-slate-200">

              <tr>

                <th className="p-4 text-left">
                  Day
                </th>

                <th className="p-4 text-left">
                  Breakfast
                </th>

                <th className="p-4 text-left">
                  Lunch
                </th>

                <th className="p-4 text-left">
                  Dinner
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {menus.map((menu) => (

                <tr
                  key={menu._id}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition text-sm font-medium text-slate-700"
                >

                  <td className="p-4 font-bold text-slate-900">
                    {menu.day}
                  </td>

                  <td className="p-4">
                    {menu.breakfast.join(", ")}
                  </td>

                  <td className="p-4">
                    {menu.lunch.join(", ")}
                  </td>

                  <td className="p-4">
                    {menu.dinner.join(", ")}
                  </td>

                 <td className="p-4 text-center">

  <div className="flex justify-center gap-3">

    <button
      onClick={() => {
        setEditingId(menu._id);

        setFormData({
          day: menu.day,
          breakfast: menu.breakfast.join(", "),
          lunch: menu.lunch.join(", "),
          dinner: menu.dinner.join(", "),
        });
      }}
      className="bg-violet-50 hover:bg-violet-100 text-violet-700 px-4 py-2 rounded-lg font-bold text-xs shadow-sm transition hover:scale-[1.03] duration-150 cursor-pointer"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(menu._id)}
      className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold text-xs shadow-sm transition hover:scale-[1.03] duration-150 cursor-pointer"
    >
      Delete
    </button>

  </div>

</td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>
          </div>
  );
};

export default ManageMenu;