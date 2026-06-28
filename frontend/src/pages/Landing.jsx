import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative overflow-hidden flex flex-col justify-between">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />

      <nav className="flex items-center justify-between px-8 py-5 relative z-10 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold text-violet-600 tracking-tight">
          DineFlow
        </h1>

        <div className="flex gap-4">
          <Link
  to="/login"
  className="px-5 py-2 rounded-xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] transition-all duration-150 font-bold text-sm flex items-center"
>
  Login
</Link>

       <Link
  to="/register"
  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-750 text-white shadow-sm hover:scale-[1.02] hover:shadow-md active:scale-[0.98] transition-all duration-150 font-bold text-sm flex items-center"
>
  Register
</Link>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-8 py-12 text-center relative z-10 flex-1 flex flex-col justify-center">

        <div className="inline-block px-4 py-2 rounded-full border border-violet-100 bg-violet-50 text-violet-600 text-xs md:text-sm font-semibold tracking-wide mb-6 shadow-sm mx-auto">
          Smart Hostel Dining Management System
        </div>

        <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
          Hostel Dining
          <span className="text-violet-600"> Management </span>
          System
        </h2>

        <p className="mt-4 text-slate-500 text-base max-w-2xl mx-auto leading-relaxed font-medium">
          Manage menus, collect reviews, track complaints and
          improve the dining experience through one centralized platform.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
  to="/register"
  className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-bold transition hover:scale-[1.02] hover:shadow-md active:scale-[0.98] duration-150 shadow-sm"
>
  Get Started
</Link>

        <Link
  to="/login"
  className="px-8 py-3 rounded-xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] transition-all duration-150 shadow-sm"
>
  Login
</Link>
        </div>

      </section>

      <section className="max-w-6xl mx-auto px-8 pb-20 relative z-10 w-full">

        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300">

          <div className="grid md:grid-cols-3">

            <div className="text-center p-8 hover:scale-[1.01] transition-transform duration-200">
              <div className="text-4xl mb-4">📅</div>

              <h3 className="text-xl font-bold text-violet-600 tracking-tight">
                Weekly Menu Updates
              </h3>

              <p className="text-slate-500 mt-2 text-sm leading-relaxed font-medium">
                Fresh and updated meal plans every week.
              </p>
            </div>

            <div className="text-center p-8 md:border-x border-slate-100 hover:scale-[1.01] transition-transform duration-200">
              <div className="text-4xl mb-4">🕒</div>

              <h3 className="text-xl font-bold text-violet-600 tracking-tight">
                Real-Time Tracking
              </h3>

              <p className="text-slate-500 mt-2 text-sm leading-relaxed font-medium">
                Track and resolve complaints quickly.
              </p>
            </div>

            <div className="text-center p-8 hover:scale-[1.01] transition-transform duration-200">
              <div className="text-4xl mb-4">👥</div>

              <h3 className="text-xl font-bold text-violet-600 tracking-tight">
                Student Feedback
              </h3>

              <p className="text-slate-500 mt-2 text-sm leading-relaxed font-medium">
                Share reviews and improve food quality.
              </p>
            </div>

          </div>

        </div>

      </section>

      <footer className="text-center text-slate-400 py-8 relative z-10 text-xs md:text-sm border-t border-slate-200/60 max-w-7xl mx-auto w-full px-6 flex items-center justify-center font-medium">
        ❤️ Built for better dining experiences • DineFlow 2026
      </footer>

    </div>
  );
}

export default Landing;