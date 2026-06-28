import { useEffect, useState } from "react";
import axios from "../utils/axios";

const MyActivity = () => {
  const [complaints, setComplaints] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const token = localStorage.getItem("token");

      const [complaintRes, reviewRes] = await Promise.all([
        axios.get("/complaints/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        axios.get("/reviews/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setComplaints(complaintRes.data);
      setReviews(reviewRes.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Resolved")
      return "bg-emerald-50 text-emerald-700 border border-emerald-150/60 font-bold";

    if (status === "In Progress")
      return "bg-blue-50 text-blue-750 border border-blue-150/60 font-bold";

    return "bg-amber-50 text-amber-705 border border-amber-150/60 font-bold";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-500 flex justify-center items-center font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 max-w-5xl mx-auto w-full">

      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
        My Activity
      </h1>

      {/* Complaints */}

      <div className="mb-10">

        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-5">
          📝 My Complaints
        </h2>

        {complaints.length === 0 ? (

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-slate-500 font-bold">
            No Complaints Found
          </div>

        ) : (

          <div className="space-y-4">

            {complaints.map((complaint) => (

              <div
                key={complaint._id}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.005] transition-all duration-150"
              >
                <div className="flex justify-between items-center">

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {complaint.subject}
                  </h3>

                  <span
                    className={`${getStatusColor(
                      complaint.status
                    )} px-3 py-1 rounded-full text-xs`}
                  >
                    {complaint.status}
                  </span>

                </div>

                <p className="text-violet-650 text-sm font-bold mt-1">
                  {complaint.category}
                </p>

                <p className="text-slate-655 mt-3 text-sm font-medium leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  {complaint.message}
                </p>

                {complaint.adminReply && (

                  <div className="mt-4 bg-slate-50/80 border border-slate-150 rounded-xl p-4">

                    <p className="font-bold text-xs text-green-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      Admin Reply
                    </p>

                    <p className="text-slate-655 text-sm font-semibold leading-relaxed">{complaint.adminReply}</p>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Reviews */}

      <div>

        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-5">
          ⭐ My Reviews
        </h2>
                {reviews.length === 0 ? (

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-slate-500 font-bold">
            No Reviews Found
          </div>

        ) : (

          <div className="space-y-4">

            {reviews.map((review) => (

              <div
                key={review._id}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.005] transition-all duration-150"
              >
                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {review.day}
                    </h3>

                    <p className="text-amber-600 mt-1 text-sm font-bold">
                      ⭐ {review.rating}/5
                    </p>

                  </div>

                  <span className="text-slate-400 text-xs font-semibold">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

                <p className="text-slate-655 mt-4 text-sm font-medium leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  {review.comment || "No comment"}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default MyActivity;