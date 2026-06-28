import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Review = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    day: "",
    rating: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "/reviews",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review Submitted Successfully ⭐");

setTimeout(() => {
  navigate("/student-dashboard");
}, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-extrabold text-slate-905 tracking-tight mb-6">
        Submit Review
      </h1>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full bg-white border border-slate-355 rounded-xl p-3 text-slate-800 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150 cursor-pointer"
          >
            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>

          <input
            type="number"
            min="1"
            max="5"
            name="rating"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={handleChange}
            className="w-full bg-white border border-slate-355 rounded-xl p-3 text-slate-800 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
          />

          <textarea
            rows="5"
            name="comment"
            placeholder="Write review..."
            value={formData.comment}
            onChange={handleChange}
            className="w-full bg-white border border-slate-355 rounded-xl p-3 text-slate-800 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150 resize-none"
          />

          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-755 px-6 py-3 rounded-xl text-white font-bold transition shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-150 cursor-pointer"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;