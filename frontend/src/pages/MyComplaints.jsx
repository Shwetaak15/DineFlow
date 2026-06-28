import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/complaints/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaints(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusBadgeClass = (status) => {
    if (status === "Resolved") return "bg-emerald-50 text-emerald-700 border border-emerald-100/60 font-bold";
    if (status === "In Progress") return "bg-blue-50 text-blue-750 border border-blue-100/60 font-bold";
    return "bg-amber-50 text-amber-705 border border-amber-100/60 font-bold";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12 relative overflow-hidden flex flex-col items-center justify-start">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition hover:scale-[1.02] active:scale-[0.98] duration-150 flex items-center gap-1.5 mb-4 cursor-pointer"
            >
              <FaArrowLeft /> Back
            </button>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              My Complaints
            </h1>
            <p className="text-slate-500 mt-1 text-sm font-semibold">
              Track the progress and resolutions of your submitted reports.
            </p>
          </div>

          <div className="bg-violet-50 border border-violet-100 px-4 py-2 font-bold text-violet-650 rounded-xl text-sm shadow-sm flex items-center">
            Total Issues: {complaints.length}
          </div>
        </div>

        {/* Complaints Feed */}
        {loading ? (
          <div className="bg-white border border-slate-200 p-12 text-center text-slate-500 rounded-2xl shadow-sm">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-600 mb-2"></div>
            <p className="font-semibold">Loading complaints history...</p>
          </div>
        ) : complaints.length === 0 ? (
          <div className="bg-white border border-slate-200 p-12 text-center text-slate-500 rounded-2xl shadow-sm flex flex-col items-center justify-center">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-lg font-bold text-slate-800">All Clear!</h3>
            <p className="text-slate-505 mt-1 text-sm font-semibold">You haven't submitted any complaints yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:scale-[1.005] transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-extrabold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-md border border-violet-100">
                      {complaint.category}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 mt-2.5">
                      {complaint.subject}
                    </h2>
                  </div>

                  <span
                    className={`px-3.5 py-1 rounded-full text-xs font-bold ${getStatusBadgeClass(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </div>

                <p className="text-slate-655 mt-4 text-sm leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100 font-medium">
                  {complaint.message}
                </p>

                {complaint.adminReply && (
                  <div className="mt-5 bg-slate-50/50 border border-slate-150 p-4 rounded-xl">
                    <p className="font-bold text-xs text-green-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-700"></span>
                      Admin Reply
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                      {complaint.adminReply}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default MyComplaints;