import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axios";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/reviews/${id}`);

      setReviews(reviews.filter((review) => review._id !== id));

      toast.success("Review deleted successfully 🗑️");
    } catch (err) {
      console.error(err);
     toast.error("Failed to delete review.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 max-w-7xl mx-auto w-full">
      <h1 className="text-3xl font-extrabold text-slate-909 tracking-tight mb-8">
        Manage Reviews
      </h1>

      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <tr className="text-left">
                <th className="p-4">#</th>
                <th className="p-4">Student</th>
                <th className="p-4">Email</th>
                <th className="p-4">Day</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Comment</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <tr
                    key={review._id}
                    className="border-t border-slate-100 hover:bg-slate-50/50 transition text-sm font-medium text-slate-700"
                  >
                    <td className="p-4">{index + 1}</td>

                    <td className="p-4 font-bold text-slate-900">
                      {review.student?.name}
                    </td>

                    <td className="p-4 text-slate-500 font-semibold">
                      {review.student?.email}
                    </td>

                    <td className="p-4">{review.day}</td>

                    <td className="p-4 font-bold text-amber-600">⭐ {review.rating}/5</td>

                    <td className="p-4 max-w-sm text-slate-600">
                      {review.comment}
                    </td>

                    <td className="p-4 text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteReview(review._id)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold text-xs shadow-sm transition hover:scale-[1.03] duration-150 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-8 text-slate-400 font-semibold"
                  >
                    No Reviews Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageReviews;