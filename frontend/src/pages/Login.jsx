import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function Login() {

  const [formData, setFormData] = useState({
  email: "",
  password: "",
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

  try {
    const res = await API.post("/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("token", res.data.token);
localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

toast.success("Login Successful 🎉");

if (res.data.user.role === "admin") {
  navigate("/admin-dashboard");
} else {
  navigate("/student-dashboard");
}
  } catch (error) {
    toast.error(
  error.response?.data?.message || "Login Failed"
);
  }
};
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-violet-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-sm">

        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">

          <h1 className="text-2xl font-extrabold text-violet-600 text-center tracking-tight">
            DineFlow
          </h1>

          <h2 className="text-2xl font-bold text-slate-800 text-center mt-6">
            Welcome Back
          </h2>

          <p className="text-slate-505 text-center mt-2 text-sm font-semibold">
            Login to continue
          </p>

          <form className="mt-8"  onSubmit={handleSubmit}>

            <div className="mb-5">
              <label className="block text-slate-600 mb-2 font-bold text-sm">
                Email
              </label>
                <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-350 text-slate-850 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
/>
            </div>

            <div className="mb-6">
              <label className="block text-slate-600 mb-2 font-bold text-sm">
                Password
              </label>

              <input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Enter your password"
  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-350 text-slate-850 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-150"
/>
            </div>
  
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-bold transition shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-150 cursor-pointer"
            >
              Login
            </button>

          </form>

          <p className="text-center text-slate-500 mt-6 text-sm font-semibold">
            Don't have an account?{" "}
    <Link
  to="/register"
  className="text-violet-600 hover:text-violet-500 font-bold transition"
>
  Register
</Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;