import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [reply, setReply] = useState("");

  const [status, setStatus] = useState("Pending");

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("/complaints");

      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const openReplyModal = (complaint) => {
    setSelectedComplaint(complaint);

    setReply(complaint.adminReply || "");

    setStatus(complaint.status);
  };

  const closeModal = () => {
    setSelectedComplaint(null);

    setReply("");

    setStatus("Pending");
  };

  const updateComplaint = async () => {
    try {
      await axios.put(
        `/complaints/${selectedComplaint._id}/reply`,
        {
          adminReply: reply,
          status,
        }
      );

      closeModal();

      fetchComplaints();

toast.success("Complaint updated successfully 🎉");
    } catch (err) {
      console.log(err);

toast.error("Failed to update complaint");
    }
  };

  const badgeColor = (status) => {
    if (status === "Resolved")
      return "bg-emerald-50 text-emerald-700 border border-emerald-100/60 font-bold";

    if (status === "In Progress")
      return "bg-blue-50 text-blue-750 border border-blue-100/60 font-bold";

    return "bg-amber-50 text-amber-705 border border-amber-100/60 font-bold";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 max-w-7xl mx-auto w-full">

      <h1 className="text-4xl font-extrabold text-slate-909 tracking-tight">
        Manage Complaints
      </h1>

      <p className="text-slate-505 mt-2 mb-8 text-sm font-semibold">
        View, reply and resolve student complaints.
      </p>

      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">

        {loading ? (

          <div className="p-10 text-center text-slate-500 font-bold">
            Loading...
          </div>

        ) : complaints.length === 0 ? (

          <div className="p-10 text-center text-slate-500 font-bold">
            No Complaints Found
          </div>

        ) : (

          <table className="w-full border-collapse">

            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">

              <tr>

                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Subject
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {complaints.map((complaint) => (

                                <tr
                  key={complaint._id}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition text-sm font-medium text-slate-700"
                >
                  <td className="p-4 font-bold text-slate-909">
                    {complaint.student?.name}
                  </td>

                  <td className="p-4">
                    {complaint.category}
                  </td>

                  <td className="p-4">
                    {complaint.subject}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs border ${badgeColor(
                        complaint.status
                      )}`}
                    >
                      {complaint.status}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        openReplyModal(complaint)
                      }
                      className="bg-violet-50 hover:bg-violet-100 text-violet-700 px-4 py-2 rounded-lg font-bold text-xs shadow-sm transition hover:scale-[1.03] duration-150 cursor-pointer"
                    >
                      Reply
                    </button>
                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {selectedComplaint && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="bg-white w-full max-w-xl rounded-2xl p-8 border border-slate-200 shadow-xl">

            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
              Reply to Complaint
            </h2>

            <div className="mb-5">

              <label className="block mb-2 text-slate-650 font-bold text-sm">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full bg-white border border-slate-355 rounded-xl p-3 text-slate-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150 cursor-pointer"
              >
                <option>Pending</option>

                <option>In Progress</option>

                <option>Resolved</option>

              </select>

            </div>

            <div>

              <label className="block mb-2 text-slate-650 font-bold text-sm">
                Admin Reply
              </label>

              <textarea
                rows="5"
                value={reply}
                onChange={(e) =>
                  setReply(e.target.value)
                }
                className="w-full bg-white border border-slate-355 rounded-xl p-3 text-slate-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150 resize-none"
              />

            </div>

            <div className="flex justify-end gap-4 mt-8">

              <button
                onClick={closeModal}
                className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-2 rounded-xl font-bold transition hover:scale-[1.02] active:scale-[0.98] duration-150 shadow-sm cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={updateComplaint}
                className="bg-violet-600 hover:bg-violet-755 px-5 py-2 text-white rounded-xl font-bold shadow-sm transition hover:scale-[1.02] active:scale-[0.98] duration-150 cursor-pointer"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}
          </div>
  );
};

export default ManageComplaints;