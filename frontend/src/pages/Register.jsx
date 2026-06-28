import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function Register() {

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const navigate = useNavigate();

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const res = await API.post("/auth/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "student",
    });

   toast.success("Registration Successful 🎉");

   setTimeout(() => {
  navigate("/login");
}, 1500);

    console.log(res.data);
  } catch (error) {
    toast.error(
  error.response?.data?.message || "Something went wrong"
);
  }
};



  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute w-[600px] h-[600px] bg-violet-500/5 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-lg">

        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">

          <h1 className="text-3xl font-extrabold text-violet-600 text-center tracking-tight">
            DineFlow
          </h1>

          <h2 className="text-3xl font-bold text-slate-800 text-center mt-6">
            Create Account
          </h2>

          <p className="text-slate-505 text-center mt-2 text-sm font-semibold">
            Join DineFlow today
          </p>

          <form className="mt-6" onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block text-slate-600 mb-2 font-bold text-sm">
                Full Name
              </label>

              <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter your full name"
  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-350 text-slate-855 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
/>
            </div>

            <div className="mb-4">
              <label className="block text-slate-600 mb-2 font-bold text-sm">
                Email
              </label>

            <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-350 text-slate-855 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
/>
            </div>

            <div className="mb-4">
              <label className="block text-slate-600 mb-2 font-bold text-sm">
                Password
              </label>

             <input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Create a password"
  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-350 text-slate-855 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
/>
            </div>

            <div className="mb-6">
              <label className="block text-slate-600 mb-2 font-bold text-sm">
                Confirm Password
              </label>

             <input
  type="password"
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  placeholder="Confirm your password"
  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-350 text-slate-855 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
/>
            </div>

 
            
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-bold transition shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-150 cursor-pointer"
            >
              Create Account
            </button>

          </form>

          <p className="text-center text-slate-500 mt-6 text-sm font-semibold">
            Already have an account?{" "}
          </p>
<Link
  to="/login"
  className="text-violet-600 hover:text-violet-500 font-bold transition flex justify-center mt-1 text-sm"
>
  Login
</Link>
        </div>

      </div>

    </div>
  );
}

export default Register;