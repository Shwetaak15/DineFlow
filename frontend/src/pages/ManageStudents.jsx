import { useEffect, useState } from "react";
import axios from "../utils/axios";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/users/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 max-w-7xl mx-auto w-full">
      <h1 className="text-4xl font-extrabold text-slate-909 tracking-tight mb-2">
        Students
      </h1>

      <p className="text-slate-505 mb-8 text-sm font-semibold">
        View all registered students.
      </p>

      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-bold">
            Loading...
          </div>
        ) : students.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-bold">
            No Students Found
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Joined</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-t border-slate-100 hover:bg-slate-50/50 transition text-sm font-medium text-slate-700"
                >
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 font-bold text-slate-909">
                    {student.name}
                  </td>

                  <td className="p-4 text-slate-505 font-semibold">
                    {student.email}
                  </td>

                  <td className="p-4">
                    {student.role}
                  </td>

                  <td className="p-4 text-slate-500">
                    {student.createdAt
                      ? new Date(
                          student.createdAt
                        ).toLocaleDateString()
                      : "-"}
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

export default ManageStudents;