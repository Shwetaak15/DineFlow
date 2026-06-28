import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Complaint = () => {
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    description: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    await axios.post(
      "/complaints",
      {
        category: formData.category,
        subject: formData.subject,
        message: formData.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   toast.success("Complaint Submitted Successfully 🎉");

setTimeout(() => {
  navigate("/student-dashboard");
}, 1500);

    navigate("/student-dashboard");
  } catch (error) {
    console.log(error);

   toast.error("Failed to submit complaint");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Raise Complaint
      </h1>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-slate-600 font-bold text-sm">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-white border border-slate-350 rounded-xl p-3 text-slate-850 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150 cursor-pointer"
            >
              <option value="">Select Category</option>
              <option value="Food Quality">
                Food Quality
              </option>
              <option value="Hygiene">
                Hygiene
              </option>
              <option value="Staff Behaviour">
                Staff Behaviour
              </option>
              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-slate-600 font-bold text-sm">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter complaint subject"
              className="w-full bg-white border border-slate-355 rounded-xl p-3 text-slate-850 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-600 font-bold text-sm">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your complaint..."
              className="w-full bg-white border border-slate-355 rounded-xl p-3 text-slate-850 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150 resize-none"
            />
          </div>

       <button
  type="submit"
  disabled={loading}
  className="bg-violet-600 hover:bg-violet-755 disabled:bg-violet-400 px-6 py-3 rounded-xl font-bold text-white shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer"
>
  {loading ? "Submitting..." : "Submit Complaint"}
</button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;