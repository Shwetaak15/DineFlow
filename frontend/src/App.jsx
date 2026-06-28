import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import Complaints from "./pages/Complaints";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyComplaints from "./pages/MyComplaints";

import Review from "./pages/Review";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ManageComplaints from "./pages/ManageComplaints";
import ManageMenu from "./pages/ManageMenu";
import ManageReviews from "./pages/ManageReviews";
import MyActivity from "./pages/MyActivity";
import TodayMenu from "./pages/TodayMenu";
import ManageStudents from "./pages/ManageStudents";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
 <Route
  path="/student-dashboard"
  element={
    <ProtectedRoute>
      <StudentDashboard />
    </ProtectedRoute>
  }
/>
  <Route
  path="/complaints"
  element={
    <ProtectedRoute>
      <Complaints />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-complaints"
  element={
    <ProtectedRoute>
      <MyComplaints />
    </ProtectedRoute>
  }
/>
<Route
  path="/review"
  element={
    <ProtectedRoute>
      <Review />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/manage-complaints"
  element={
    <ProtectedRoute>
      <ManageComplaints />
    </ProtectedRoute>
  }
/>
<Route
  path="/manage-menu"
  element={
    <ProtectedRoute>
      <ManageMenu />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/reviews"
  element={
    <ProtectedRoute role="admin">
      <ManageReviews />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-activity"
  element={
    <ProtectedRoute role="student">
      <MyActivity />
    </ProtectedRoute>
  }
/>
<Route
  path="/today-menu"
  element={
    <ProtectedRoute>
      <TodayMenu />
    </ProtectedRoute>
  }
/>
<Route
  path="/students"
  element={
    <ProtectedRoute>
      <ManageStudents />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;